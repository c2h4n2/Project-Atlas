const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0 Safari/537.36";

export type SearchResult = {
  title: string;
  url: string;
};

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function unwrapDuckDuckGoUrl(value: string) {
  try {
    const url = new URL(value, "https://duckduckgo.com");

    if (url.hostname.includes("duckduckgo.com")) {
      const uddg = url.searchParams.get("uddg");
      if (uddg) return decodeURIComponent(uddg);
    }

    return url.toString();
  } catch {
    return value;
  }
}

export async function searchWeb(
  query: string,
  maxResults = 6,
): Promise<SearchResult[]> {
  const endpoint =
    "https://html.duckduckgo.com/html/?q=" +
    encodeURIComponent(query);

  const response = await fetch(endpoint, {
    headers: {
      "user-agent": USER_AGENT,
      accept: "text/html,application/xhtml+xml",
      "accept-language": "en-US,en;q=0.9",
    },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(
      `Search returned ${response.status} ${response.statusText}`,
    );
  }

  const html = await response.text();
  const results: SearchResult[] = [];
  const pattern =
    /<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;

  let match: RegExpExecArray | null;

  while ((match = pattern.exec(html)) !== null) {
    const url = unwrapDuckDuckGoUrl(decodeHtml(match[1]));
    const title = decodeHtml(
      match[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    );

    if (!/^https?:\/\//i.test(url)) continue;

    results.push({ title, url });

    if (results.length >= maxResults) break;
  }

  return results;
}
