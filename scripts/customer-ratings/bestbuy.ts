import { scoreExactProductMatch } from "./matching";
import type { CatalogProduct, RatingCandidate } from "./types";

type BestBuyProduct = {
  name?: string;
  sku?: number;
  url?: string;
  customerReviewAverage?: number | string;
  customerReviewCount?: number | string;
  manufacturer?: string;
  modelNumber?: string;
};

type BestBuyResponse = {
  from?: number;
  to?: number;
  total?: number;
  currentPage?: number;
  totalPages?: number;
  products?: BestBuyProduct[];
};

function searchTerms(product: CatalogProduct) {
  const raw = `${product.brand} ${product.name}`
    .replace(/[™®©]/g, " ")
    .replace(/[()]/g, " ")
    .replace(/[^a-zA-Z0-9.+-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  // Best Buy keyword search ANDs repeated search= terms.
  // Keep the most useful terms while avoiding excessively strict queries.
  const unique = Array.from(
    new Set(
      raw.filter(
        (term) =>
          term.length > 1 &&
          !["inch", "with", "edition", "wireless"].includes(
            term.toLowerCase(),
          ),
      ),
    ),
  );

  // Put brand first and preserve model-like tokens.
  return unique.slice(0, 8);
}

function buildSearchUrl(product: CatalogProduct, apiKey: string) {
  const terms = searchTerms(product);

  if (terms.length === 0) {
    throw new Error(`No usable Best Buy search terms for ${product.slug}`);
  }

  const query = terms
    .map((term) => `search=${encodeURIComponent(term)}`)
    .join("&");

  const show = [
    "name",
    "sku",
    "url",
    "customerReviewAverage",
    "customerReviewCount",
    "manufacturer",
    "modelNumber",
  ].join(",");

  // IMPORTANT:
  // Best Buy's Products API expects ONE set of parentheses:
  // /v1/products(search=foo&search=bar)
  //
  // The previous adapter generated:
  // /v1/products((search=foo&search=bar))
  // which can cause the entire request to fail.
  return (
    `https://api.bestbuy.com/v1/products(${query})` +
    `?apiKey=${encodeURIComponent(apiKey)}` +
    `&format=json&pageSize=25&show=${encodeURIComponent(show)}`
  );
}

function asNumber(value: number | string | undefined) {
  if (typeof value === "number") return value;

  if (typeof value === "string") {
    const parsed = Number(value.replace(/,/g, "").trim());
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

export async function collectFromBestBuy(
  product: CatalogProduct,
  apiKey: string,
): Promise<RatingCandidate[]> {
  const url = buildSearchUrl(product, apiKey);

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "C2H4N3-Product-Sync/2.0",
    },
  });

  const body = await response.text();

  if (!response.ok) {
    const safeBody = body.slice(0, 800);

    throw new Error(
      `Best Buy API ${response.status} ${response.statusText}\n` +
        `Request: ${url.replace(apiKey, "[REDACTED]")}\n` +
        `Response: ${safeBody}`,
    );
  }

  let data: BestBuyResponse;

  try {
    data = JSON.parse(body) as BestBuyResponse;
  } catch {
    throw new Error(
      `Best Buy returned non-JSON content: ${body.slice(0, 500)}`,
    );
  }

  const candidates: RatingCandidate[] = [];

  for (const item of data.products ?? []) {
    const rating = asNumber(item.customerReviewAverage);
    const reviewCount = asNumber(item.customerReviewCount);
    const itemName = item.name?.trim() ?? "";

    if (
      !itemName ||
      rating <= 0 ||
      rating > 5 ||
      !Number.isFinite(reviewCount) ||
      reviewCount <= 0
    ) {
      continue;
    }

    const candidateIdentity = [
      item.manufacturer ?? "",
      itemName,
      item.modelNumber ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    const match = scoreExactProductMatch(
      product.name,
      product.brand,
      candidateIdentity,
    );

    candidates.push({
      slug: product.slug,
      platform: "Best Buy",
      productName: itemName,
      rating,
      reviewCount: Math.round(reviewCount),
      url:
        item.url ??
        `https://www.bestbuy.com/site/searchpage.jsp?st=${encodeURIComponent(
          product.name,
        )}`,
      checkedAt: new Date().toISOString().slice(0, 10),
      matchScore: match.score,
      exactMatch: match.exact,
      evidence: [
        ...match.evidence,
        item.modelNumber
          ? `Best Buy model: ${item.modelNumber}`
          : "Best Buy model number unavailable",
        item.sku
          ? `Best Buy SKU: ${item.sku}`
          : "Best Buy SKU unavailable",
      ],
    });
  }

  return candidates.sort((a, b) => {
    if (a.exactMatch !== b.exactMatch) {
      return a.exactMatch ? -1 : 1;
    }

    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }

    return b.reviewCount - a.reviewCount;
  });
}

export function getBestBuyDebugUrl(
  product: CatalogProduct,
  apiKey: string,
) {
  return buildSearchUrl(product, apiKey).replace(
    apiKey,
    "[REDACTED]",
  );
}
