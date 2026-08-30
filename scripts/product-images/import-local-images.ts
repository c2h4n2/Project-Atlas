import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

import { products } from "../../data/products";
import { writeLocalProductImageIndex } from "./utils/local-index";

const projectRoot = process.cwd();
const incomingDirectory = path.join(projectRoot, "incoming-product-images");
const outputDirectory = path.join(projectRoot, "public", "products");
const supportedExtensions = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);

function normalizeBaseName(fileName: string) {
  return path.basename(fileName, path.extname(fileName)).trim().toLowerCase();
}

async function collectImageFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectImageFiles(fullPath)));
    } else if (
      entry.isFile() &&
      supportedExtensions.has(path.extname(entry.name).toLowerCase())
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  await mkdir(incomingDirectory, { recursive: true });
  await mkdir(outputDirectory, { recursive: true });

  const productBySlug = new Map(products.map((product) => [product.slug.toLowerCase(), product]));
  const imageFiles = await collectImageFiles(incomingDirectory);

  if (imageFiles.length === 0) {
    console.log("No images found under incoming-product-images/.");
    console.log("You may place images directly in that folder or inside category subfolders.");
    console.log("Name every file with its Atlas product slug, for example:");
    console.log("  tablets/apple-ipad-air-m3-11.jpg");
    process.exit(0);
  }

  let imported = 0;
  let unknown = 0;
  let duplicates = 0;
  const seenSlugs = new Set<string>();

  for (const inputPath of imageFiles.sort()) {
    const fileName = path.basename(inputPath);
    const slug = normalizeBaseName(fileName);
    const product = productBySlug.get(slug);

    if (!product) {
      console.warn(`SKIP unknown slug: ${path.relative(incomingDirectory, inputPath)}`);
      unknown += 1;
      continue;
    }

    if (seenSlugs.has(slug)) {
      console.warn(`SKIP duplicate image for ${slug}: ${path.relative(incomingDirectory, inputPath)}`);
      duplicates += 1;
      continue;
    }

    seenSlugs.add(slug);
    const outputPath = path.join(outputDirectory, `${product.slug}.webp`);

    await sharp(inputPath)
      .rotate()
      .resize({ width: 1600, height: 1200, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 88, effort: 5 })
      .toFile(outputPath);

    console.log(`OK   ${product.name} -> /products/${product.slug}.webp`);
    imported += 1;
  }

  console.log("\nImage import summary");
  console.log(`Imported:   ${imported}`);
  console.log(`Unknown:    ${unknown}`);
  console.log(`Duplicates: ${duplicates}`);
  console.log(`Catalog:    ${products.length}`);

  const indexResult = await writeLocalProductImageIndex(projectRoot);
  console.log(`Indexed:    ${indexResult.count} local product images`);
  console.log("\nRun npm run images:audit to see remaining gaps.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
