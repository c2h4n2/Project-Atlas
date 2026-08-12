import fs from "node:fs";
import path from "node:path";

const cardFile = path.resolve(process.cwd(), "components/ProductCard.tsx");
let card = fs.readFileSync(cardFile, "utf8");

const productImport = 'import type { Product } from "@/data/products";';
const ratingImport =
  'import CustomerRating from "@/components/CustomerRating";';

if (!card.includes(ratingImport)) {
  card = card.replace(productImport, `${productImport}\n${ratingImport}`);
}

card = card.replace(/Atlas score/g, "C2H4N3 score");
card = card.replace(/Customers/g, "Customer rating");

card = card.replace(
  /<CustomerRating\s+rating=\{product\.customerRating\}\s+reviewCount=\{product\.totalReviewCount\}\s*\/>/m,
  '<CustomerRating product={product} />',
);

fs.writeFileSync(cardFile, card, "utf8");
console.log("Updated ProductCard customer rating logic.");

const pageFile = path.resolve(process.cwd(), "app/products/[slug]/page.tsx");
let page = fs.readFileSync(pageFile, "utf8");

const breakdownImport =
  'import CustomerRatingBreakdown from "@/components/CustomerRatingBreakdown";';

if (!page.includes(breakdownImport)) {
  const lines = page.split("\n");
  const insertAt = lines.findIndex((line) => !line.startsWith("import "));
  lines.splice(Math.max(0, insertAt), 0, breakdownImport);
  page = lines.join("\n");
}

if (!page.includes("<CustomerRatingBreakdown")) {
  const index = page.lastIndexOf("</main>");
  if (index === -1) throw new Error("Could not find </main> in product page.");
  page =
    page.slice(0, index) +
    `  <div className="mx-auto max-w-6xl px-6 pb-16">\n` +
    `    <CustomerRatingBreakdown product={product} />\n` +
    `  </div>\n\n` +
    page.slice(index);
}

fs.writeFileSync(pageFile, page, "utf8");
console.log("Added rating breakdown to product detail pages.");
