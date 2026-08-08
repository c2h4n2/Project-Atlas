import { products } from "../../data/products";
import { sortRetailerLinks } from "../../data/retailers";

const retailerCounts = new Map<string, number>();
const missing: string[] = [];

for (const product of products) {
  const links = sortRetailerLinks(product.affiliateLinks);

  if (links.length === 0) {
    missing.push(`${product.name} (${product.slug})`);
    continue;
  }

  for (const link of links) {
    retailerCounts.set(
      link.retailer,
      (retailerCounts.get(link.retailer) ?? 0) + 1,
    );
  }
}

console.log("Project Atlas retailer-link audit");
console.log("----------------------------------");
console.log(`Products: ${products.length}`);
console.log(`With retailer links: ${products.length - missing.length}`);
console.log(`Without retailer links: ${missing.length}`);
console.log("");

console.log("Links by retailer:");
for (const [retailer, count] of [...retailerCounts.entries()].sort(
  (a, b) => b[1] - a[1],
)) {
  console.log(`- ${retailer}: ${count}`);
}

console.log("");
console.log("Products needing retailer links:");
for (const item of missing) {
  console.log(`- ${item}`);
}
