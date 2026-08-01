import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";

import {
  products,
  type Product,
  type ProductSource,
} from "../../data/products";
import { getProviderForSource } from "./providers";
import type {
  ImageCandidate,
  ImagePathUpdate,
  SyncResult,
} from "./types";
import { downloadImage } from "./utils/http";
import { saveImageAsWebp } from "./utils/image";
import { updateProductImagePaths } from "./utils/products-file";

const FORCE_DOWNLOAD = process.argv.includes("--force");

const PROJECT_ROOT = process.cwd();

const PRODUCTS_FILE_PATH = path.join(
  PROJECT_ROOT,
  "data",
  "products.ts",
);

const OUTPUT_DIRECTORY = path.join(
  PROJECT_ROOT,
  "public",
  "products",
);

const MANUFACTURER_PLATFORMS = new Set([
  "meta",
  "ray-ban",
  "rayban",
  "oakley",
]);

function normalizePlatform(platform: string): string {
  return platform.trim().toLowerCase();
}

function prioritizeSources(
  sources: ProductSource[],
): ProductSource[] {
  return [...sources].sort((first, second) => {
    const firstIsManufacturer =
      MANUFACTURER_PLATFORMS.has(
        normalizePlatform(first.platform),
      );

    const secondIsManufacturer =
      MANUFACTURER_PLATFORMS.has(
        normalizePlatform(second.platform),
      );

    if (firstIsManufacturer === secondIsManufacturer) {
      return 0;
    }

    return firstIsManufacturer ? -1 : 1;
  });
}

async function tryCandidate(
  candidate: ImageCandidate,
  outputFilePath: string,
): Promise<void> {
  console.log(`    Trying image: ${candidate.url}`);

  const imageBuffer = await downloadImage(
    candidate.url,
    candidate.pageUrl,
  );

  await saveImageAsWebp(imageBuffer, outputFilePath);
}

async function findAndSaveProductImage(
  product: Product,
  outputFilePath: string,
): Promise<ImageCandidate> {
  const sourceErrors: string[] = [];

  for (const source of prioritizeSources(product.sources)) {
    const provider = getProviderForSource(source);

    console.log(
      `  Checking ${source.platform} with ${provider.name}`,
    );

    try {
      const candidates = await provider.findCandidates(source);

      if (candidates.length === 0) {
        throw new Error(
          "No metadata or JSON-LD image candidates were found",
        );
      }

      const candidateErrors: string[] = [];

      for (const candidate of candidates) {
        try {
          await tryCandidate(candidate, outputFilePath);
          return candidate;
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : String(error);

          candidateErrors.push(
            `${candidate.url}: ${message}`,
          );
        }
      }

      throw new Error(
        [
          "All discovered image candidates failed:",
          ...candidateErrors,
        ].join("\n"),
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : String(error);

      console.warn(`  Source failed: ${message}`);

      sourceErrors.push(
        `${source.platform} (${source.url}): ${message}`,
      );
    }
  }

  throw new Error(
    [
      "No usable image could be downloaded.",
      ...sourceErrors,
    ].join("\n"),
  );
}

async function syncProduct(product: Product): Promise<{
  result: SyncResult;
  pathUpdate: ImagePathUpdate;
}> {
  const publicImagePath = `/products/${product.slug}.webp`;

  const outputFilePath = path.join(
    OUTPUT_DIRECTORY,
    `${product.slug}.webp`,
  );

  const pathUpdate: ImagePathUpdate = {
    currentPath: product.image.src,
    nextPath: publicImagePath,
  };

  console.log(`\n${product.name}`);

  if (!FORCE_DOWNLOAD && existsSync(outputFilePath)) {
    console.log(`  Skipped existing image: ${publicImagePath}`);

    return {
      result: {
        productName: product.name,
        productSlug: product.slug,
        status: "skipped",
        outputPath: publicImagePath,
      },
      pathUpdate,
    };
  }

  try {
    const candidate = await findAndSaveProductImage(
      product,
      outputFilePath,
    );

    console.log(`  Saved: ${publicImagePath}`);

    return {
      result: {
        productName: product.name,
        productSlug: product.slug,
        status: "downloaded",
        outputPath: publicImagePath,
        providerName: candidate.providerName,
        pageUrl: candidate.pageUrl,
        imageUrl: candidate.url,
      },
      pathUpdate,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    console.error(`  Failed: ${message}`);

    return {
      result: {
        productName: product.name,
        productSlug: product.slug,
        status: "failed",
        error: message,
      },
      pathUpdate,
    };
  }
}

function printSummary(results: SyncResult[]): void {
  const downloaded = results.filter(
    (result) => result.status === "downloaded",
  );

  const skipped = results.filter(
    (result) => result.status === "skipped",
  );

  const failed = results.filter(
    (result) => result.status === "failed",
  );

  console.log("\n----------------------------------------");
  console.log("Product image synchronization summary");
  console.log("----------------------------------------");
  console.log(`Downloaded: ${downloaded.length}`);
  console.log(`Skipped:    ${skipped.length}`);
  console.log(`Failed:     ${failed.length}`);

  if (downloaded.length > 0) {
    console.log("\nDownloaded products:");

    for (const result of downloaded) {
      console.log(
        `- ${result.productName} via ${
          result.providerName ?? "unknown provider"
        }`,
      );
    }
  }

  if (failed.length > 0) {
    console.log("\nProducts requiring manual review:");

    for (const result of failed) {
      console.log(`- ${result.productName}`);
      console.log(`  ${result.error ?? "Unknown error"}`);
    }
  }
}

async function main(): Promise<void> {
  console.log("Project Atlas product image synchronization");

  console.log(
    FORCE_DOWNLOAD
      ? "Mode: force replacement"
      : "Mode: skip existing images",
  );

  await mkdir(OUTPUT_DIRECTORY, {
    recursive: true,
  });

  const syncEntries = [];

  for (const product of products) {
    syncEntries.push(await syncProduct(product));
  }

  const successfulUpdates = syncEntries
    .filter(({ result }) => result.status !== "failed")
    .map(({ pathUpdate }) => pathUpdate);

  const updatedPathCount = await updateProductImagePaths(
    PRODUCTS_FILE_PATH,
    successfulUpdates,
  );

  const results = syncEntries.map(({ result }) => result);

  printSummary(results);

  console.log(
    `\nUpdated product image paths: ${updatedPathCount}`,
  );

  if (results.some((result) => result.status === "failed")) {
    process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  const message =
    error instanceof Error
      ? error.stack ?? error.message
      : String(error);

  console.error(
    "\nImage synchronization stopped unexpectedly.",
  );

  console.error(message);

  process.exitCode = 1;
});