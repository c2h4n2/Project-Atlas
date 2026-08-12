import fs from "node:fs";
import path from "node:path";

const productsFile = path.resolve(process.cwd(), "data/products.ts");
let products = fs.readFileSync(productsFile, "utf8");

const imports = [
  'import { laptops } from "./products/laptops";',
  'import { monitors } from "./products/monitors";',
];

for (const line of imports) {
  if (!products.includes(line)) {
    const lines = products.split("\n");
    let insertAt = 0;

    while (
      insertAt < lines.length &&
      lines[insertAt].startsWith("import ")
    ) {
      insertAt += 1;
    }

    lines.splice(insertAt, 0, line);
    products = lines.join("\n");
  }
}

if (!products.includes("...laptops")) {
  products = products.replace(
    /export const products: Product\[\] = \[\n/,
    'export const products: Product[] = [\n  ...laptops,\n  ...monitors,\n',
  );
}

fs.writeFileSync(productsFile, products, "utf8");

const categoriesFile = path.resolve(process.cwd(), "data/categories.ts");
const categories = fs.readFileSync(categoriesFile, "utf8");

if (!categories.includes('id: "laptops"')) {
  console.log(
    "NOTE: Laptops category config not found. Manual category config may be needed.",
  );
}

if (!categories.includes('id: "monitors"')) {
  console.log(
    "NOTE: Monitors category config not found. Manual category config may be needed.",
  );
}

console.log("Product imports/spreads applied.");
console.log("Next run: npx tsx scripts/audit-laptops-monitors.ts");
