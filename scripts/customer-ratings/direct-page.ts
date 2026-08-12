import { extractProductRatingFromJsonLd } from "./jsonld";
import { scoreExactProductMatch } from "./matching";
import type { CatalogProduct, RatingCandidate } from "./types";

const USER_AGENT =
  "Mozilla/5.0 (compatible; C2H4N3RatingCollector/1.0; +https://project-c2h4n3.vercel.app/)";

export async function collectFromDirectPage(
  product: CatalogProduct,
  platform: string,
  url: string,
): Promise<RatingCandidate | null> {
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "user-agent": USER_AGENT,
      accept: "text/html,application/xhtml+xml",
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const extracted = extractProductRatingFromJsonLd(html);

  if (!extracted) return null;

  const match = scoreExactProductMatch(
    product.name,
    product.brand,
    extracted.productName || product.name,
  );

  return {
    slug: product.slug,
    platform,
    productName: extracted.productName || product.name,
    rating: extracted.rating,
    reviewCount: extracted.reviewCount,
    url: response.url,
    checkedAt: new Date().toISOString().slice(0, 10),
    matchScore: match.score,
    exactMatch: match.exact,
    evidence: match.evidence,
  };
}
