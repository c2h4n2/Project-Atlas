const DEFAULT_PAGE_TIMEOUT_MS = 20_000;
const DEFAULT_IMAGE_TIMEOUT_MS = 30_000;

const USER_AGENT =
  "Mozilla/5.0 (compatible; ProjectAtlasImageSync/1.0)";

const PAGE_HEADERS: Record<string, string> = {
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Cache-Control": "no-cache",
  "User-Agent": USER_AGENT,
};

const IMAGE_HEADERS: Record<string, string> = {
  Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Cache-Control": "no-cache",
  "User-Agent": USER_AGENT,
};

async function fetchWithTimeout(
  url: string,
  timeoutMs: number,
  headers: Record<string, string>,
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    return await fetch(url, {
      headers,
      redirect: "follow",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchPageHtml(
  pageUrl: string,
): Promise<string> {
  const response = await fetchWithTimeout(
    pageUrl,
    DEFAULT_PAGE_TIMEOUT_MS,
    PAGE_HEADERS,
  );

  if (!response.ok) {
    throw new Error(
      `Page request returned ${response.status} ${response.statusText}`,
    );
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().includes("text/html")) {
    throw new Error(
      `Expected HTML but received "${contentType || "unknown"}"`,
    );
  }

  return response.text();
}

export async function downloadImage(
  imageUrl: string,
  referringPageUrl: string,
): Promise<Buffer> {
  const response = await fetchWithTimeout(
    imageUrl,
    DEFAULT_IMAGE_TIMEOUT_MS,
    {
      ...IMAGE_HEADERS,
      Referer: referringPageUrl,
    },
  );

  if (!response.ok) {
    throw new Error(
      `Image request returned ${response.status} ${response.statusText}`,
    );
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (
    contentType &&
    !contentType.toLowerCase().startsWith("image/")
  ) {
    throw new Error(
      `Expected an image but received "${contentType}"`,
    );
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  if (buffer.length === 0) {
    throw new Error("Downloaded image was empty");
  }

  return buffer;
}