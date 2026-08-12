import fs from "node:fs";
import path from "node:path";

const packageFile = path.resolve(process.cwd(), "package.json");
const packageJson = JSON.parse(
  fs.readFileSync(packageFile, "utf8"),
) as {
  scripts?: Record<string, string>;
};

packageJson.scripts ??= {};

packageJson.scripts["sync-products"] =
  "tsx scripts/sync-products.ts";

packageJson.scripts["sync-products:dry"] =
  "tsx scripts/sync-products.ts --dry-run";

packageJson.scripts["sync-products:no-images"] =
  "tsx scripts/sync-products.ts --skip-images";

packageJson.scripts["sync-products:ratings-only"] =
  "tsx scripts/sync-products.ts --skip-images --skip-build";

fs.writeFileSync(
  packageFile,
  `${JSON.stringify(packageJson, null, 2)}\n`,
  "utf8",
);

console.log("Added Product Sync scripts to package.json:");
console.log("- npm run sync-products");
console.log("- npm run sync-products:dry");
console.log("- npm run sync-products:no-images");
console.log("- npm run sync-products:ratings-only");
