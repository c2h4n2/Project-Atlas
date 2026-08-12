import fs from "node:fs";
import path from "node:path";

const file = path.resolve(process.cwd(), "components/ProductCard.tsx");
const source = fs.readFileSync(file, "utf8");

const checks = [
  {
    name: "CustomerRating import",
    ok: source.includes(
      'import CustomerRating from "@/components/CustomerRating";',
    ),
  },
  {
    name: "Customer rating label",
    ok: source.includes("Customer rating"),
  },
  {
    name: "Universal customer rating component",
    ok: source.includes("<CustomerRating product={product} />"),
  },
];

for (const check of checks) {
  console.log(`${check.ok ? "PASS" : "FAIL"}: ${check.name}`);
}

if (checks.some((check) => !check.ok)) {
  process.exit(1);
}
