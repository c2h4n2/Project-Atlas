import { scoreExactProductMatch } from "./matching";
import type { CatalogProduct, RatingCandidate } from "./types";

type JsonObject = Record<string, unknown>;

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0 Safari/537.36";

function toNumber(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(
      value.replace(/,/g, "").replace(/[^\d.]/g, "").trim(),
    );
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function collectObjects(value: unknown, output: JsonObject[]) {
  if (Array.isArray(value)) {
    for (const item of value) collectObjects(item, output);
    return;
  }

  if (!value || typeof value !== "object") return;

  const object = value as JsonObject;
  output.push(object);

  for (const child of Object.values(object)) {
    if (child && typeof child === "object") {
      collectObjects(child, output);
    }
  }
}

function platformFromUrl(url: string) {
  const host = new URL(url).hostname.replace(/^www\./, "");

  const known: Array<[RegExp, string]> = [
    [/bestbuy\.com$/, "Best Buy"],
    [/walmart\.com$/, "Walmart"],
    [/amazon\.com$/, "Amazon"],
    [/samsung\.com$/, "Samsung"],
    [/dell\.com$/, "Dell"],
    [/lg\.com$/, "LG"],
    [/apple\.com$/, "Apple"],
    [/garmin\.com$/, "Garmin"],
    [/sony\.com$/, "Sony"],
    [/bose\.com$/, "Bose"],
    [/jbl\.com$/, "JBL"],
    [/lenovo\.com$/, "Lenovo"],
    [/asus\.com$/, "ASUS"],
  ];

  for (const [pattern, label] of known) {
    if (pattern.test(host)) return label;
  }

  return host;
}

export async function collectRatingFromPage(
  product: CatalogProduct,
  url: string,
): Promise<RatingCandidate | null> {
  const response = await fetch(url, {
    headers: {
      "user-agent": USER_AGENT,
      accept: "text/html,application/xhtml+xml",
      "accept-language": "en-US,en;q=0.9",
    },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const objects: JsonObject[] = [];
  const scriptPattern =
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  let match: RegExpExecArray | null;

  while ((match = scriptPattern.exec(html)) !== null) {
    try {
      collectObjects(JSON.parse(match[1].trim()), objects);
    } catch {
      // Ignore malformed blocks.
    }
  }

  for (const object of objects) {
    const type = object["@type"];
    const isProduct =
      type === "Product" ||
      (Array.isArray(type) && type.includes("Product"));

    if (!isProduct) continue;

    const aggregate = object.aggregateRating;
    if (!aggregate || typeof aggregate !== "object") continue;

    const ratingObject = aggregate as JsonObject;
    const rating = toNumber(ratingObject.ratingValue);
    const reviewCount = toNumber(
      ratingObject.reviewCount ?? ratingObject.ratingCount,
    );

    if (
      !rating ||
      rating <= 0 ||
      rating > 5 ||
      !reviewCount ||
      reviewCount <= 0
    ) {
      continue;
    }

    const productName =
      typeof object.name === "string" ? object.name : product.name;

    const matchResult = scoreExactProductMatch(
      product.name,
      product.brand,
      productName,
    );

    return {
      slug: product.slug,
      platform: platformFromUrl(response.url),
      productName,
      rating,
      reviewCount: Math.round(reviewCount),
      url: response.url,
      checkedAt: new Date().toISOString().slice(0, 10),
      matchScore: matchResult.score,
      exactMatch: matchResult.exact,
      evidence: matchResult.evidence,
    };
  }

  return null;
}
