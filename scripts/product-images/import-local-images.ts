import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

import { products } from "../../data/products";
import { writeLocalProductImageIndex } from "./utils/local-index";

const projectRoot = process.cwd();
const incomingDirectory = path.join(projectRoot, "incoming-product-images");
const outputDirectory = path.join(projectRoot, "public", "products");
const supportedExtensions = new Set([
  ".avif",
  ".jpeg",
  ".jpg",
  ".png",
  ".webp",
]);

function normalizeBaseName(fileName: string) {
  return path.basename(fileName, path.extname(fileName)).trim().toLowerCase();
}

async function main() {
  await mkdir(incomingDirectory, { recursive: true });
  await mkdir(outputDirectory, { recursive: true });

  const productBySlug = new Map(
    products.map((product) => [product.slug.toLowerCase(), product]),
  );

  const entries = await readdir(incomingDirectory, { withFileTypes: true });
  const imageFiles = entries.filter(
    (entry) =>
      entry.isFile() &&
      supportedExtensions.has(path.extname(entry.name).toLowerCase()),
  );

  if (imageFiles.length === 0) {
    console.log("No images found in incoming-product-images/.");
    console.log("Name each file with its Atlas product slug, for example:");
    console.log("  apple-macbook-air-13-m5.jpg");
    process.exit(0);
  }

  let imported = 0;
  let unknown = 0;
  const seenSlugs = new Set<string>();

  for (const file of imageFiles) {
    const slug = normalizeBaseName(file.name);
    const product = productBySlug.get(slug);

    if (!product) {
      console.warn(`SKIP unknown slug: ${file.name}`);
      unknown += 1;
      continue;
    }

    if (seenSlugs.has(slug)) {
      console.warn(`SKIP duplicate image for ${slug}: ${file.name}`);
      continue;
    }

    seenSlugs.add(slug);

    const inputPath = path.join(incomingDirectory, file.name);
    const outputPath = path.join(outputDirectory, `${product.slug}.webp`);

    await sharp(inputPath)
      .rotate()
      .resize({
        width: 1600,
        height: 1200,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 88, effort: 5 })
      .toFile(outputPath);

    console.log(`OK   ${product.name} -> /products/${product.slug}.webp`);
    imported += 1;
  }

  console.log("\nImage import summary");
  console.log(`Imported: ${imported}`);
  console.log(`Unknown:  ${unknown}`);
  console.log(`Catalog:  ${products.length}`);

  const indexResult = await writeLocalProductImageIndex(projectRoot);
  console.log(`Indexed:  ${indexResult.count} local product images`);
  console.log("\nRun npm run images:audit to see remaining gaps.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
