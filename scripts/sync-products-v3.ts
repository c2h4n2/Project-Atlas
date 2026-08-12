import fs from "node:fs";
import path from "node:path";
import { runStage, type StageResult } from "./product-sync-v3/runner";

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const skipImages = args.has("--skip-images");
const skipRatings = args.has("--skip-ratings");
const skipBuild = args.has("--skip-build");

const stages: StageResult[] = [];
const startedAt = new Date().toISOString();

function add(result: StageResult) {
  stages.push(result);

  if (result.status === "fail") {
    finish(false);
    process.exit(result.exitCode ?? 1);
  }
}

function finish(success: boolean) {
  const dir = path.resolve(process.cwd(), "customer-ratings");
  fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(
    path.join(dir, "product-sync-v3-report.json"),
    JSON.stringify(
      {
        version: 3,
        startedAt,
        finishedAt: new Date().toISOString(),
        success,
        stages,
      },
      null,
      2,
    ),
    "utf8",
  );
}

console.log("========================================");
console.log("Project C2H4N3 Product Sync Engine v3");
console.log("========================================");
console.log(`Mode:    ${dryRun ? "DRY RUN" : "WRITE"}`);
console.log(`Images:  ${skipImages ? "skip" : "sync"}`);
console.log(`Ratings: ${skipRatings ? "skip" : "sync"}`);
console.log(`Build:   ${skipBuild ? "skip" : "validate"}`);

add(
  runStage(
    "Product health audit",
    "npx",
    ["tsx", "scripts/audit-product-health.ts"],
    { fatal: true },
  ),
);

add(
  runStage(
    "Product image sync",
    "npm",
    ["run", "sync-product-images"],
    {
      skip: skipImages || dryRun,
      fatal: false,
      note:
        "v3 treats image-download failures as warnings so ratings still continue.",
    },
  ),
);

if (!skipRatings) {
  const collector =
    "scripts/collect-customer-ratings-web.ts";

  if (!fs.existsSync(path.resolve(process.cwd(), collector))) {
    add({
      name: "Public web rating collector",
      status: "fail",
      note: `${collector} is missing.`,
    });
  } else {
    const collectorArgs = [
      "tsx",
      collector,
      "--only-unrated",
    ];

    if (!dryRun) collectorArgs.push("--write");

    add(
      runStage(
        "Public web customer rating collection",
        "npx",
        collectorArgs,
        {
          fatal: false,
          note:
            "Search/page failures are recoverable; unresolved products remain Not Rated.",
        },
      ),
    );

    if (!dryRun) {
      add(
        runStage(
          "Customer rating import",
          "npx",
          ["tsx", "scripts/import-customer-ratings.ts"],
          { fatal: true },
        ),
      );

      add(
        runStage(
          "Customer rating audit",
          "npx",
          ["tsx", "scripts/audit-customer-ratings.ts"],
          { fatal: true },
        ),
      );
    }
  }
}

add(
  runStage(
    "Final product health audit",
    "npx",
    ["tsx", "scripts/audit-product-health.ts"],
    { fatal: true },
  ),
);

add(
  runStage(
    "Production validation",
    "npm",
    ["run", "check"],
    {
      skip: skipBuild,
      fatal: true,
    },
  ),
);

finish(true);

const warnings = stages.filter((s) => s.status === "warn").length;

console.log("\n========================================");
console.log("Product Sync Engine v3 complete");
console.log("========================================");
console.log(`Warnings: ${warnings}`);
console.log(
  "Report: customer-ratings/product-sync-v3-report.json",
);
