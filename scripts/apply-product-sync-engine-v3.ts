import fs from "node:fs";
import path from "node:path";

const file = path.resolve(process.cwd(), "package.json");
const pkg = JSON.parse(fs.readFileSync(file, "utf8")) as {
  scripts?: Record<string, string>;
};

pkg.scripts ??= {};

pkg.scripts["sync-products"] =
  "tsx scripts/sync-products-v3.ts";
pkg.scripts["sync-products:dry"] =
  "tsx scripts/sync-products-v3.ts --dry-run";
pkg.scripts["sync-products:ratings-only"] =
  "tsx scripts/sync-products-v3.ts --skip-images --skip-build";
pkg.scripts["product-health"] =
  "tsx scripts/audit-product-health.ts";

fs.writeFileSync(
  file,
  `${JSON.stringify(pkg, null, 2)}\n`,
  "utf8",
);

console.log("Product Sync Engine v3 scripts installed.");
