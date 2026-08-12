import fs from "node:fs";
import path from "node:path";

const packageFile = path.resolve(process.cwd(), "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageFile, "utf8")) as {
  scripts?: Record<string, string>;
};

packageJson.scripts ??= {};

packageJson.scripts["collect-ratings:web"] =
  "tsx scripts/collect-customer-ratings-web.ts --only-unrated";
packageJson.scripts["collect-ratings:web:write"] =
  "tsx scripts/collect-customer-ratings-web.ts --only-unrated --write";
packageJson.scripts["collect-ratings:web:test"] =
  "tsx scripts/collect-customer-ratings-web.ts --only-unrated --limit=3";

fs.writeFileSync(
  packageFile,
  `${JSON.stringify(packageJson, null, 2)}\n`,
  "utf8",
);

const syncFile = path.resolve(process.cwd(), "scripts/sync-products.ts");

if (fs.existsSync(syncFile)) {
  let sync = fs.readFileSync(syncFile, "utf8");

  sync = sync.replaceAll(
    "scripts/collect-customer-ratings.ts",
    "scripts/collect-customer-ratings-web.ts",
  );

  fs.writeFileSync(syncFile, sync, "utf8");
}

console.log("Public web rating collector installed.");
