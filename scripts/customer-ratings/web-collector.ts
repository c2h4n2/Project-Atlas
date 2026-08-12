import { searchWeb } from "./web-search";
import { collectRatingFromPage } from "./page-rating";
import type { CatalogProduct, RatingCandidate } from "./types";

const SOURCE_DOMAINS = [
  "bestbuy.com",
  "walmart.com",
  "samsung.com",
  "dell.com",
  "lg.com",
  "garmin.com",
  "sony.com",
  "bose.com",
  "jbl.com",
  "lenovo.com",
  "asus.com",
];

export async function collectFromPublicWeb(product: CatalogProduct) {
  const accepted: RatingCandidate[] = [];
  const rejected: RatingCandidate[] = [];
  const failures: Array<{ url: string; error: string }> = [];
  const seen = new Set<string>();

  for (const domain of SOURCE_DOMAINS) {
    const query = `"${product.brand} ${product.name}" site:${domain}`;

    let results;
    try {
      results = await searchWeb(query, 3);
    } catch (error) {
      failures.push({
        url: query,
        error: error instanceof Error ? error.message : String(error),
      });
      continue;
    }

    for (const result of results) {
      if (seen.has(result.url)) continue;
      seen.add(result.url);

      try {
        const candidate = await collectRatingFromPage(
          product,
          result.url,
        );

        if (!candidate) continue;

        (candidate.exactMatch ? accepted : rejected).push(candidate);
      } catch (error) {
        failures.push({
          url: result.url,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    if (accepted.length >= 3) break;
  }

  return { accepted, rejected, failures };
}
