import fs from "node:fs";
import path from "node:path";
import { products } from "../data/products";
import { collectFromBestBuy } from "./customer-ratings/bestbuy";
import { collectFromDirectPage } from "./customer-ratings/direct-page";
import {
  readExistingRatings,
  writeRatings,
} from "./customer-ratings/csv";
import type {
  CsvRatingRow,
  RatingCandidate,
} from "./customer-ratings/types";

async function main() {
  const args = new Set(process.argv.slice(2));
  const shouldWrite = args.has("--write");
  const onlyUnrated = args.has("--only-unrated");

  const root = process.cwd();
  const ratingsFile = path.resolve(
    root,
    "customer-ratings/customer-ratings.csv",
  );
  const seedFile = path.resolve(
    root,
    "customer-ratings/source-seeds.csv",
  );
  const reportFile = path.resolve(
    root,
    "customer-ratings/collector-report.json",
  );

  const existing = readExistingRatings(ratingsFile);
  const existingKeys = new Set(
    existing.map(
      (row) =>
        `${row.slug}|${row.platform.toLowerCase()}|${row.url.toLowerCase()}`,
    ),
  );

  type Seed = {
    slug: string;
    platform: string;
    url: string;
  };

  function parseSeedCsv(): Seed[] {
    if (!fs.existsSync(seedFile)) return [];

    const [headerLine, ...lines] = fs
      .readFileSync(seedFile, "utf8")
      .split(/\r?\n/)
      .filter(
        (line) =>
          line.trim() !== "" &&
          !line.trim().startsWith("#"),
      );

    if (!headerLine) return [];

    const header = headerLine
      .split(",")
      .map((value) => value.trim().toLowerCase());

    const slugIndex = header.indexOf("slug");
    const platformIndex = header.indexOf("platform");
    const urlIndex = header.indexOf("url");

    if (
      slugIndex < 0 ||
      platformIndex < 0 ||
      urlIndex < 0
    ) {
      throw new Error(
        "source-seeds.csv requires slug,platform,url columns",
      );
    }

    return lines.map((line) => {
      const values = line.split(",").map((value) => value.trim());

      return {
        slug: values[slugIndex] ?? "",
        platform: values[platformIndex] ?? "",
        url: values[urlIndex] ?? "",
      };
    });
  }

  const seeds = parseSeedCsv();
  const seedsBySlug = new Map<string, Seed[]>();

  for (const seed of seeds) {
    const list = seedsBySlug.get(seed.slug) ?? [];
    list.push(seed);
    seedsBySlug.set(seed.slug, list);
  }

  const bestBuyApiKey = process.env.BEST_BUY_API_KEY?.trim();
  const accepted: RatingCandidate[] = [];
  const rejected: RatingCandidate[] = [];
  const failures: Array<{
    slug: string;
    platform: string;
    error: string;
  }> = [];

  const catalog = products.filter((product) => {
    if (!onlyUnrated) return true;

    return (
      product.customerRating <= 0 ||
      product.totalReviewCount <= 0
    );
  });

  console.log(`Catalog products considered: ${catalog.length}`);
  console.log(
    `Best Buy API: ${
      bestBuyApiKey
        ? "enabled"
        : "disabled (BEST_BUY_API_KEY not set)"
    }`,
  );
  console.log(`Direct source seeds: ${seeds.length}`);
  console.log(`Mode: ${shouldWrite ? "write" : "dry run"}`);
  console.log("");

  for (const product of catalog) {
    console.log(`${product.name} (${product.slug})`);

    if (bestBuyApiKey) {
      try {
        const candidates = await collectFromBestBuy(
          product,
          bestBuyApiKey,
        );

        const best = candidates[0];

        if (best) {
          const target = best.exactMatch ? accepted : rejected;
          target.push(best);

          console.log(
            `  Best Buy: ${
              best.exactMatch ? "ACCEPT" : "REVIEW"
            } ${best.rating.toFixed(1)}/5 ` +
              `(${best.reviewCount.toLocaleString()}) ` +
              `match ${(best.matchScore * 100).toFixed(0)}%`,
          );
        } else {
          console.log("  Best Buy: no rated candidate found");
        }
      } catch (error) {
        failures.push({
          slug: product.slug,
          platform: "Best Buy",
          error:
            error instanceof Error
              ? error.message
              : String(error),
        });

        console.log("  Best Buy: failed");
      }
    }

    for (const seed of seedsBySlug.get(product.slug) ?? []) {
      try {
        const candidate = await collectFromDirectPage(
          product,
          seed.platform,
          seed.url,
        );

        if (!candidate) {
          console.log(
            `  ${seed.platform}: no Product aggregateRating JSON-LD found`,
          );
          continue;
        }

        const target = candidate.exactMatch
          ? accepted
          : rejected;

        target.push(candidate);

        console.log(
          `  ${seed.platform}: ${
            candidate.exactMatch ? "ACCEPT" : "REVIEW"
          } ${candidate.rating.toFixed(1)}/5 ` +
            `(${candidate.reviewCount.toLocaleString()}) ` +
            `match ${(candidate.matchScore * 100).toFixed(0)}%`,
        );
      } catch (error) {
        failures.push({
          slug: product.slug,
          platform: seed.platform,
          error:
            error instanceof Error
              ? error.message
              : String(error),
        });

        console.log(`  ${seed.platform}: failed`);
      }
    }
  }

  const newRows: CsvRatingRow[] = [];

  for (const candidate of accepted) {
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

    if (slugCompare !== 0) return slugCompare;

    return a.platform.localeCompare(b.platform);
  });

  fs.writeFileSync(
    reportFile,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        consideredProducts: catalog.length,
        accepted,
        rejected,
        failures,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log("\n----------------------------------------");
  console.log("Customer Rating Collector summary");
  console.log("----------------------------------------");
  console.log(`Accepted exact matches: ${accepted.length}`);
  console.log(`Needs manual review:   ${rejected.length}`);
  console.log(`Failures:              ${failures.length}`);
  console.log(`New CSV rows:          ${newRows.length}`);
  console.log(
    "Report: customer-ratings/collector-report.json",
  );

  if (shouldWrite) {
    writeRatings(ratingsFile, merged);

    console.log(
      `Updated: customer-ratings/customer-ratings.csv (${merged.length} rows)`,
    );

    console.log("\nNext:");
    console.log("npx tsx scripts/import-customer-ratings.ts");
    console.log("npx tsx scripts/audit-customer-ratings.ts");
    console.log("npm run check");
  } else {
    console.log(
      "\nDry run only. Re-run with --write to update the CSV.",
    );
  }
}

main().catch((error) => {
  console.error("\nCustomer Rating Collector failed:");
  console.error(error);
  process.exit(1);
});
