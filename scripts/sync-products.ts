import fs from "node:fs";
import path from "node:path";
import { runCommand, type StepResult } from "./product-sync/utils";
import { writeProductSyncReport } from "./product-sync/report";

const args = new Set(process.argv.slice(2));

const dryRun = args.has("--dry-run");
const skipImages = args.has("--skip-images");
const skipRatings = args.has("--skip-ratings");
const skipBuild = args.has("--skip-build");
const allRatings = args.has("--all-ratings");

const startedAt = new Date().toISOString();
const steps: StepResult[] = [];

function hasFile(relativePath: string) {
  return fs.existsSync(path.resolve(process.cwd(), relativePath));
}

function stopIfFailed(result: StepResult) {
  steps.push(result);

  if (!result.ok) {
    const report = {
      startedAt,
      finishedAt: new Date().toISOString(),
      mode: dryRun ? ("dry-run" as const) : ("write" as const),
      steps,
      success: false,
    };

    writeProductSyncReport(report);
    process.exit(result.exitCode ?? 1);
  }
}

console.log("========================================");
console.log("Project C2H4N3 Product Sync Engine");
console.log("========================================");
console.log(`Mode: ${dryRun ? "DRY RUN" : "WRITE"}`);
console.log(`Images: ${skipImages ? "skip" : "sync"}`);
console.log(`Ratings: ${skipRatings ? "skip" : "collect"}`);
console.log(`Build: ${skipBuild ? "skip" : "check"}`);

stopIfFailed(
  runCommand(
    "Catalog audit",
    "npx",
    ["tsx", "-e",
      'import { products } from "./data/products"; const slugs=new Set(products.map(p=>p.slug)); console.log(`Products: ${products.length}`); console.log(`Unique slugs: ${slugs.size}`); if(slugs.size!==products.length) process.exit(1);'
    ],
  ),
);

stopIfFailed(
  runCommand(
    "Product image sync",
    "npm",
    ["run", "sync-product-images"],
    {
      skip: skipImages || dryRun,
      note: dryRun
        ? "Dry run does not download or replace images."
        : undefined,
    },
  ),
);

const collectorExists = hasFile("scripts/collect-customer-ratings-web.ts");
const importerExists = hasFile("scripts/import-customer-ratings.ts");
const ratingAuditExists = hasFile("scripts/audit-customer-ratings.ts");

if (!skipRatings) {
  if (!collectorExists) {
    stopIfFailed({
      name: "Online customer rating collector",
      ok: false,
      note:
        "scripts/collect-customer-ratings-web.ts is missing. Install the Online Customer Rating Collector first.",
    });
  }

  const collectorArgs = [
    "tsx",
    "scripts/collect-customer-ratings-web.ts",
  ];

  if (!allRatings) collectorArgs.push("--only-unrated");
  if (!dryRun) collectorArgs.push("--write");

  stopIfFailed(
    runCommand(
      "Online customer rating collector",
      "npx",
      collectorArgs,
      {
        note: process.env.BEST_BUY_API_KEY
          ? "Best Buy API adapter enabled."
          : "BEST_BUY_API_KEY not set; direct source seeds and other configured adapters will still run.",
      },
    ),
  );

  if (!dryRun) {
    if (!importerExists) {
      stopIfFailed({
        name: "Customer rating import",
        ok: false,
        note:
          "scripts/import-customer-ratings.ts is missing.",
      });
    }

    stopIfFailed(
      runCommand(
        "Customer rating import",
        "npx",
        ["tsx", "scripts/import-customer-ratings.ts"],
      ),
    );

    if (!ratingAuditExists) {
      stopIfFailed({
        name: "Customer rating audit",
        ok: false,
        note:
          "scripts/audit-customer-ratings.ts is missing.",
      });
    }

    stopIfFailed(
      runCommand(
        "Customer rating audit",
        "npx",
        ["tsx", "scripts/audit-customer-ratings.ts"],
      ),
    );
  }
} else {
  steps.push({
    name: "Customer rating sync",
    ok: true,
    skipped: true,
    note: "Skipped by --skip-ratings.",
  });
}

stopIfFailed(
  runCommand(
    "Production validation",
    "npm",
    ["run", "check"],
    {
      skip: skipBuild,
      note: "Skipped by --skip-build.",
    },
  ),
);

const report = {
  startedAt,
  finishedAt: new Date().toISOString(),
  mode: dryRun ? ("dry-run" as const) : ("write" as const),
  steps,
  success: true,
};

writeProductSyncReport(report);

console.log("\n========================================");
console.log("Product Sync complete");
console.log("========================================");

if (dryRun) {
  console.log(
    "No product images or customer-rating CSV data were modified.",
  );
} else {
  console.log(
    "Images, customer ratings, audits, and build validation completed.",
  );
}

console.log("\nRecommended review:");
console.log("- customer-ratings/collector-report.json");
console.log("- customer-ratings/product-sync-report.json");
console.log("- /all-products");
console.log("- affected category pages");
