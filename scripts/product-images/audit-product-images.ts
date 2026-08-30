import { existsSync } from "node:fs";
import path from "node:path";

import { products } from "../../data/products";

const projectRoot = process.cwd();
const outputDirectory = path.join(projectRoot, "public", "products");

const rows = products.map((product) => {
  const localPath = path.join(outputDirectory, `${product.slug}.webp`);
  const hasLocalImage = existsSync(localPath);
  const hasExplicitImage = product.image.src.trim().length > 0;

  return {
    product,
    hasLocalImage,
    hasExplicitImage,
    covered: hasLocalImage || hasExplicitImage,
  };
});

const localCount = rows.filter((row) => row.hasLocalImage).length;
const explicitOnlyCount = rows.filter(
  (row) => !row.hasLocalImage && row.hasExplicitImage,
).length;
const missing = rows.filter((row) => !row.covered);

console.log("Atlas product image audit");
console.log("-------------------------");
console.log(`Products:           ${rows.length}`);
console.log(`Local images:       ${localCount}`);
console.log(`Existing URL image: ${explicitOnlyCount}`);
console.log(`Missing images:     ${missing.length}`);

if (missing.length > 0) {
  console.log("\nMissing image slugs:");
  for (const row of missing) {
    console.log(
      `${row.product.slug}\t${row.product.category}\t${row.product.name}`,
    );
  }
}
