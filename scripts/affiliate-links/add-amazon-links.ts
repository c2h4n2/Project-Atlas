import fs from "node:fs";
import path from "node:path";
import { products } from "../../data/products";

const AMAZON_TAG = "chhx2nun03-20";

const filesByCategory: Record<string, string> = {
  "ai-glasses": "data/products/ai-glasses.ts",
  "headphones-earbuds": "data/products/headphones-earbuds.ts",
  smartwatches: "data/products/smartwatches.ts",
};

function amazonSearchUrl(productName: string) {
  return `https://www.amazon.com/s?k=${encodeURIComponent(productName)}&tag=${AMAZON_TAG}`;
}

function makeAmazonEntry(productName: string) {
  return `{ retailer: "Amazon", url: "${amazonSearchUrl(productName)}" }`;
}

function hasAmazon(content: string) {
  return /retailer:\s*["']Amazon["']/.test(content);
}

const grouped = new Map<string, typeof products>();

for (const product of products) {
  const categoryId = product.categoryId ?? "ai-glasses";
  const file = filesByCategory[categoryId];

  if (!file) {
    console.warn(`Skipping unsupported category: ${categoryId} (${product.name})`);
    continue;
  }

  const list = grouped.get(file) ?? [];
  list.push(product);
  grouped.set(file, list);
}

let totalUpdated = 0;

for (const [relativeFile, fileProducts] of grouped) {
  const absoluteFile = path.resolve(process.cwd(), relativeFile);

  if (!fs.existsSync(absoluteFile)) {
    throw new Error(`Missing file: ${relativeFile}`);
  }

  const source = fs.readFileSync(absoluteFile, "utf8");

  const matches = [...source.matchAll(/affiliateLinks:\s*\[([\s\S]*?)\]/g)];

  if (matches.length !== fileProducts.length) {
    throw new Error(
      `${relativeFile}: found ${matches.length} affiliateLinks arrays but expected ${fileProducts.length}.`,
    );
  }

  let output = "";
  let cursor = 0;

  for (let index = 0; index < matches.length; index++) {
    const match = matches[index];
    const product = fileProducts[index];
    const fullMatch = match[0];
    const existingContent = match[1];
    const start = match.index ?? 0;
    const end = start + fullMatch.length;

    output += source.slice(cursor, start);

    if (hasAmazon(existingContent)) {
      output += fullMatch;
      console.log(`Amazon already present: ${product.name}`);
    } else {
      const trimmed = existingContent.trim();
      const amazonEntry = makeAmazonEntry(product.name);

      const newContent =
        trimmed.length === 0
          ? `affiliateLinks: [${amazonEntry}]`
          : `affiliateLinks: [${amazonEntry}, ${trimmed}]`;

      output += newContent;
      totalUpdated += 1;
      console.log(`Added Amazon search link: ${product.name}`);
    }

    cursor = end;
  }

  output += source.slice(cursor);
  fs.writeFileSync(absoluteFile, output, "utf8");
}

console.log("----------------------------------------");
console.log(`Amazon tracking ID: ${AMAZON_TAG}`);
console.log(`Products updated: ${totalUpdated}`);
console.log("Done.");
