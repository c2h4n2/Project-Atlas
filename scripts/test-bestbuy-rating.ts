import { products } from "../data/products";
import {
  collectFromBestBuy,
  getBestBuyDebugUrl,
} from "./customer-ratings/bestbuy";

async function main() {
  const apiKey = process.env.BEST_BUY_API_KEY?.trim();

  if (!apiKey) {
    throw new Error(
      "BEST_BUY_API_KEY is not set. Run: export BEST_BUY_API_KEY=\"YOUR_KEY\"",
    );
  }

  const slug =
    process.argv[2] ?? "samsung-galaxy-watch8-classic";

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    throw new Error(`Unknown product slug: ${slug}`);
  }

  console.log("========================================");
  console.log("Best Buy Adapter Diagnostic");
  console.log("========================================");
  console.log(`Slug:    ${product.slug}`);
  console.log(`Product: ${product.name}`);
  console.log(`Brand:   ${product.brand}`);
  console.log("");
  console.log("Request:");
  console.log(getBestBuyDebugUrl(product, apiKey));
  console.log("");

  const candidates = await collectFromBestBuy(product, apiKey);

  console.log(`Rated candidates returned: ${candidates.length}`);

  if (candidates.length === 0) {
    console.log(
      "No rated Best Buy candidates matched the search response.",
    );
    return;
  }

  for (const [index, candidate] of candidates
    .slice(0, 10)
    .entries()) {
    console.log("");
    console.log(`#${index + 1}`);
    console.log(`Name:       ${candidate.productName}`);
    console.log(
      `Rating:     ${candidate.rating.toFixed(1)} / 5`,
    );
    console.log(
      `Reviews:    ${candidate.reviewCount.toLocaleString()}`,
    );
    console.log(
      `Match:      ${(candidate.matchScore * 100).toFixed(0)}%`,
    );
    console.log(
      `Exact:      ${candidate.exactMatch ? "YES" : "NO"}`,
    );
    console.log(`URL:        ${candidate.url}`);

    for (const line of candidate.evidence) {
      console.log(`Evidence:   ${line}`);
    }
  }
}

main().catch((error) => {
  console.error("\nBest Buy diagnostic failed:");
  console.error(
    error instanceof Error ? error.message : String(error),
  );
  process.exit(1);
});
