import fs from "node:fs";
import path from "node:path";

const file = path.resolve(process.cwd(), "data/products.ts");
let source = fs.readFileSync(file, "utf8");

const importLine =
  'import { applyCustomerRatingsInPlace } from "@/lib/apply-customer-ratings";';

if (!source.includes(importLine)) {
  const lines = source.split("\n");
  let insertAt = 0;

  while (
    insertAt < lines.length &&
    lines[insertAt].startsWith("import ")
  ) {
    insertAt += 1;
  }

  lines.splice(insertAt, 0, importLine);
  source = lines.join("\n");
}

const applyLine = "applyCustomerRatingsInPlace(products);";

if (!source.includes(applyLine)) {
  source = `${source.trimEnd()}\n\n${applyLine}\n`;
}

fs.writeFileSync(file, source, "utf8");
console.log("Customer Rating Sync enabled in data/products.ts");
