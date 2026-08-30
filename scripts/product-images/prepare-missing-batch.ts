import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { products } from "../../data/products";
import { localProductImageSlugs } from "../../data/local-product-images";

const root = process.cwd();
const incomingRoot = path.join(root, "incoming-product-images");

const externalImageSlugs = new Set(
  products
    .filter((product) => product.image?.src?.startsWith("http"))
    .map((product) => product.slug),
);

function folderName(category: string) {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  const missing = products.filter(
    (product) => !localProductImageSlugs.has(product.slug) && !product.image?.src?.trim() && !externalImageSlugs.has(product.slug),
  );

  const rows = ["category,product_name,slug,required_filename,status"];
  const grouped = new Map<string, typeof missing>();

  for (const product of missing) {
    const current = grouped.get(product.category) ?? [];
    current.push(product);
    grouped.set(product.category, current);
  }

  for (const [category, categoryProducts] of grouped) {
    const dir = path.join(incomingRoot, folderName(category));
    await mkdir(dir, { recursive: true });
    const instructions = [
      `${category} — missing Atlas product images`,
      "",
      "Drop one approved product image per line below into this folder.",
      "The filename MUST match the slug exactly. JPG, PNG, WEBP or AVIF are accepted.",
      "",
      ...categoryProducts.map((p) => `${p.slug}.jpg    ${p.name}`),
      "",
    ].join("\n");
    await writeFile(path.join(dir, "README.txt"), instructions);

    for (const product of categoryProducts) {
      rows.push(
        [category, product.name, product.slug, `${product.slug}.jpg`, "missing"]
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(","),
      );
    }
  }

  await writeFile(path.join(root, "missing-product-images.csv"), rows.join("\n") + "\n");

  console.log(`Prepared ${missing.length} missing-image slots across ${grouped.size} categories.`);
  console.log("Created category folders under incoming-product-images/.");
  console.log("Created missing-product-images.csv.");
  console.log("\nNext: add approved images, then run npm run images:import.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
