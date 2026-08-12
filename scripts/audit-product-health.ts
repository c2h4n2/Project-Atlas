import fs from "node:fs";
import path from "node:path";
import { products } from "../data/products";

function localImageExists(src: string) {
  if (!src.startsWith("/")) return true;
  return fs.existsSync(
    path.resolve(process.cwd(), "public", src.replace(/^\//, "")),
  );
}

const slugs = new Set(products.map((p) => p.slug));
const rated = products.filter(
  (p) => p.customerRating > 0 && p.totalReviewCount > 0,
);
const images = products.filter(
  (p) => p.image?.src && localImageExists(p.image.src),
);
const affiliate = products.filter(
  (p) => p.affiliateLinks.length > 0,
);

console.log("========================================");
console.log("Project C2H4N3 Product Health");
console.log("========================================");
console.log(`Products:         ${products.length}`);
console.log(`Unique slugs:     ${slugs.size}`);
console.log(`Images available: ${images.length}`);
console.log(`Customer rated:   ${rated.length}`);
console.log(`Affiliate links:  ${affiliate.length}`);

if (slugs.size !== products.length) {
  console.error("Duplicate slugs detected.");
  process.exit(1);
}

for (const p of products) {
  if (!p.name.trim() || !p.brand.trim()) {
    console.error(`${p.slug}: missing required identity fields`);
    process.exit(1);
  }
}
