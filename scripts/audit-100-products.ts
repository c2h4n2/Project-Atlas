import { products } from "../data/products";

const slugs = new Set<string>();
const duplicates: string[] = [];

for (const product of products) {
  if (slugs.has(product.slug)) duplicates.push(product.slug);
  slugs.add(product.slug);
}

console.log(`Products: ${products.length}`);
console.log(`Unique slugs: ${slugs.size}`);
console.log(`Duplicate slugs: ${duplicates.length}`);

if (duplicates.length) {
  console.error("Duplicates:", duplicates);
  process.exit(1);
}

if (products.length !== 100) {
  console.error(`Expected 100 products but found ${products.length}.`);
  process.exit(1);
}
