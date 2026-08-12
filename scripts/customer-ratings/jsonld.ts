type JsonObject = Record<string, unknown>;

function toNumber(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const cleaned = value.replace(/,/g, "").trim();
    const parsed = Number(cleaned);
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

export function extractProductRatingFromJsonLd(html: string) {
  const scriptPattern =
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  const objects: JsonObject[] = [];
  let match: RegExpExecArray | null;

  while ((match = scriptPattern.exec(html)) !== null) {
    const raw = match[1].trim();
    if (!raw) continue;

    try {
      const parsed = JSON.parse(raw);
      collectObjects(parsed, objects);
    } catch {
      // Ignore malformed JSON-LD blocks.
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
    const rating = toNumber(
      ratingObject.ratingValue ?? ratingObject.rating,
    );
    const reviewCount = toNumber(
      ratingObject.reviewCount ?? ratingObject.ratingCount,
    );

    if (
      rating &&
      rating > 0 &&
      rating <= 5 &&
      reviewCount &&
      reviewCount > 0
    ) {
      return {
        productName:
          typeof object.name === "string" ? object.name : "",
        rating,
        reviewCount: Math.round(reviewCount),
      };
    }
  }

  return null;
}
