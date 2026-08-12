import fs from "node:fs";
import path from "node:path";
import { products } from "../data/products";
import { collectFromPublicWeb } from "./customer-ratings/web-collector";
import {
  readExistingRatings,
  writeRatings,
} from "./customer-ratings/csv";
import type { CsvRatingRow } from "./customer-ratings/types";

async function main() {
  const args = new Set(process.argv.slice(2));
  const shouldWrite = args.has("--write");
  const onlyUnrated = args.has("--only-unrated");
  const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
  const limit = limitArg
    ? Math.max(1, Number(limitArg.split("=")[1]))
    : undefined;

  const ratingsFile = path.resolve(
    process.cwd(),
    "customer-ratings/customer-ratings.csv",
  );
  const reportFile = path.resolve(
    process.cwd(),
    "customer-ratings/web-collector-report.json",
  );

  const existing = readExistingRatings(ratingsFile);
  const existingKeys = new Set(
    existing.map(
      (row) =>
        `${row.slug}|${row.platform.toLowerCase()}|${row.url.toLowerCase()}`,
    ),
  );

  let catalog = products.filter((product) => {
    if (!onlyUnrated) return true;
    return product.customerRating <= 0 || product.totalReviewCount <= 0;
  });

  if (limit) catalog = catalog.slice(0, limit);

  const acceptedAll = [];
  const rejectedAll = [];
  const failuresAll = [];

  console.log("========================================");
  console.log("C2H4N3 Public Web Rating Collector");
  console.log("========================================");
  console.log(`Products considered: ${catalog.length}`);
  console.log(`Mode: ${shouldWrite ? "WRITE" : "DRY RUN"}`);

  for (const [index, product] of catalog.entries()) {
    console.log(`\n[${index + 1}/${catalog.length}] ${product.name}`);

    const result = await collectFromPublicWeb(product);

    for (const candidate of result.accepted) {
      acceptedAll.push(candidate);
      console.log(
        `  ACCEPT ${candidate.platform}: ` +
          `${candidate.rating.toFixed(1)}/5 ` +
          `(${candidate.reviewCount.toLocaleString()})`,
      );
    }

    for (const candidate of result.rejected) {
      rejectedAll.push(candidate);
      console.log(
        `  REVIEW ${candidate.platform}: ` +
          `${candidate.rating.toFixed(1)}/5`,
      );
    }

    for (const failure of result.failures) {
      failuresAll.push({ slug: product.slug, ...failure });
    }

    if (result.accepted.length === 0) {
      console.log("  No exact-match public rating found.");
    }
  }

  const newRows: CsvRatingRow[] = [];

  for (const candidate of acceptedAll) {
    const key =
      `${candidate.slug}|${candidate.platform.toLowerCase()}|` +
      candidate.url.toLowerCase();

    if (existingKeys.has(key)) continue;

    newRows.push({
      slug: candidate.slug,
      platform: candidate.platform,
      rating: candidate.rating,
      reviewCount: candidate.reviewCount,
      url: candidate.url,
      checkedAt: candidate.checkedAt,
    });
  }

  const merged = [...existing, ...newRows].sort((a, b) => {
    const slugCompare = a.slug.localeCompare(b.slug);
    return slugCompare !== 0
      ? slugCompare
      : a.platform.localeCompare(b.platform);
  });

  fs.writeFileSync(
    reportFile,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        productsConsidered: catalog.length,
        accepted: acceptedAll,
        rejected: rejectedAll,
        failures: failuresAll,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log("\n----------------------------------------");
  console.log("Public Web Rating Collector summary");
  console.log("----------------------------------------");
  console.log(`Accepted exact matches: ${acceptedAll.length}`);
  console.log(`Needs manual review:   ${rejectedAll.length}`);
  console.log(`Page/search failures:  ${failuresAll.length}`);
  console.log(`New CSV rows:          ${newRows.length}`);

  if (shouldWrite) {
    writeRatings(ratingsFile, merged);
    console.log(
      `Updated customer-ratings/customer-ratings.csv (${merged.length} rows)`,
    );
  } else {
    console.log("Dry run only. Re-run with --write to update CSV.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
