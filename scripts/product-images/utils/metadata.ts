import * as cheerio from "cheerio";

type JsonRecord = Record<string, unknown>;

function resolveUrl(
  value: string,
  pageUrl: string,
): string | null {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  try {
    return new URL(trimmedValue, pageUrl).toString();
  } catch {
    return null;
  }
}

function getMetaContent(
  $: cheerio.CheerioAPI,
  selector: string,
): string | null {
  const content = $(selector).first().attr("content");

  return content?.trim() || null;
}

function getImageUrlsFromValue(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) =>
      getImageUrlsFromValue(item),
    );
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  const record = value as JsonRecord;
  const urls: string[] = [];

  if (typeof record.url === "string") {
    urls.push(record.url);
  }

  if (typeof record.contentUrl === "string") {
    urls.push(record.contentUrl);
  }

  return urls;
}

function collectJsonLdProductImages(value: unknown): string[] {
  if (!value || typeof value !== "object") {
    return [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) =>
      collectJsonLdProductImages(item),
    );
  }

  const record = value as JsonRecord;
  const images: string[] = [];

  if ("image" in record) {
    images.push(...getImageUrlsFromValue(record.image));
  }

  if ("@graph" in record) {
    images.push(...collectJsonLdProductImages(record["@graph"]));
  }

  return images;
}

function extractJsonLdImages(
  $: cheerio.CheerioAPI,
  pageUrl: string,
): string[] {
  const candidates: string[] = [];

  $('script[type="application/ld+json"]').each((_, element) => {
    const text = $(element).text().trim();

    if (!text) {
      return;
    }

    try {
      const parsed = JSON.parse(text) as unknown;
      const imageUrls = collectJsonLdProductImages(parsed);

      for (const imageUrl of imageUrls) {
        const resolvedUrl = resolveUrl(imageUrl, pageUrl);

        if (resolvedUrl) {
          candidates.push(resolvedUrl);
        }
      }
    } catch {
      // Invalid JSON-LD should not block other extraction methods.
    }
  });

  return candidates;
}

export function extractMetadataImageUrls(
  html: string,
  pageUrl: string,
): string[] {
  const $ = cheerio.load(html);

  const metadataValues = [
    getMetaContent(
      $,
      'meta[property="og:image:secure_url"]',
    ),
    getMetaContent($, 'meta[property="og:image:url"]'),
    getMetaContent($, 'meta[property="og:image"]'),
    getMetaContent($, 'meta[name="twitter:image"]'),
    getMetaContent($, 'meta[name="twitter:image:src"]'),
    $('link[rel="image_src"]').first().attr("href")?.trim() ??
      null,
  ];

  const metadataUrls = metadataValues
    .map((value) =>
      value ? resolveUrl(value, pageUrl) : null,
    )
    .filter((value): value is string => value !== null);

  const jsonLdUrls = extractJsonLdImages($, pageUrl);

  return [...new Set([...metadataUrls, ...jsonLdUrls])];
}