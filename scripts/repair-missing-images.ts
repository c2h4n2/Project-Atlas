import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const products = {
  "asus-rog-zephyrus-g16-2026":
    "https://rog.asus.com/us/laptops/rog-zephyrus/rog-zephyrus-g16-2026/",

  "asus-rog-swift-pg32ucdmr":
    "https://rog.asus.com/us/monitors/27-to-31-5-inches/rog-swift-oled-pg32ucdmr/",

  "lg-ultragear-45gx950a":
    "https://www.lg.com/us/monitors/lg-45gx950a-b-gaming-monitor",

  "sony-linkbuds-fit":
    "https://electronics.sony.com/audio/headphones/all-headphones/p/wfls910n-b",

  "sony-wf-1000xm5":
    "https://electronics.sony.com/audio/headphones/truly-wireless-earbuds/p/wf1000xm5-b",

  "sony-wh-1000xm5":
    "https://electronics.sony.com/audio/headphones/headband/p/wh1000xm5-b",

  "bose-ultra-open-earbuds":
    "https://www.bose.com/p/earbuds/bose-ultra-open-earbuds/ULT-HEADPHONEOPN.html",

  "bose-quietcomfort-earbuds":
    "https://www.bose.com/p/earbuds/bose-quietcomfort-headphones/QCEARB24-HEADPHONEIN.html",

  "sony-linkbuds-open":
    "https://electronics.sony.com/audio/headphones/all-headphones/p/wfl910-b",
};

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
  "AppleWebKit/537.36 (KHTML, like Gecko) " +
  "Chrome/124.0 Safari/537.36";

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

function absoluteUrl(value: string, base: string) {
  try {
    return new URL(decodeHtml(value), base).toString();
  } catch {
    return null;
  }
}

function findImageCandidates(html: string, pageUrl: string) {
  const candidates: string[] = [];

  function add(value?: string | null) {
    if (!value) return;

    const resolved = absoluteUrl(value, pageUrl);

    if (!resolved) return;

    if (
      /logo|favicon|icon|sprite|badge|avatar/i.test(resolved)
    ) {
      return;
    }

    if (!candidates.includes(resolved)) {
      candidates.push(resolved);
    }
  }

  const metadataPatterns = [
    /<meta[^>]+property=["']og:image(?::url)?["'][^>]+content=["']([^"']+)["']/gi,

    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::url)?["']/gi,

    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/gi,

    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/gi,
  ];

  for (const pattern of metadataPatterns) {
    let match;

    while ((match = pattern.exec(html))) {
      add(match[1]);
    }
  }

  const jsonPatterns = [
    /"primaryImage"\s*:\s*"([^"]+)"/gi,
    /"heroImage"\s*:\s*"([^"]+)"/gi,
    /"imageUrl"\s*:\s*"([^"]+)"/gi,
    /"imageURL"\s*:\s*"([^"]+)"/gi,
    /"image"\s*:\s*"([^"]+)"/gi,
  ];

  for (const pattern of jsonPatterns) {
    let match;

    while ((match = pattern.exec(html))) {
      add(match[1].replace(/\\u002F/g, "/"));
    }
  }

  const imgPattern = /<img\b([^>]+)>/gi;

  let imgMatch;

  while ((imgMatch = imgPattern.exec(html))) {
    const attributes = imgMatch[1];

    const alt =
      attributes.match(/\balt=["']([^"']*)["']/i)?.[1] ?? "";

    if (
      !/product|headphone|earbud|monitor|zephyrus|swift|ultragear|linkbuds|1000xm5|quietcomfort|open/i.test(
        alt + " " + attributes,
      )
    ) {
      continue;
    }

    const src =
      attributes.match(
        /\b(?:src|data-src|data-original)=["']([^"']+)["']/i,
      )?.[1];

    add(src);

    const srcset =
      attributes.match(
        /\b(?:srcset|data-srcset)=["']([^"']+)["']/i,
      )?.[1];

    if (srcset) {
      const items = srcset
        .split(",")
        .map((item) => item.trim().split(/\s+/)[0])
        .filter(Boolean);

      for (const item of items.reverse()) {
        add(item);
      }
    }
  }

  return candidates;
}

async function fetchPage(url: string) {
  const controller = new AbortController();

  const timeout = setTimeout(
    () => controller.abort(),
    15000,
  );

  try {
    const response = await fetch(url, {
      redirect: "follow",

      headers: {
        "user-agent": USER_AGENT,
        accept: "text/html,application/xhtml+xml",
        "accept-language": "en-US,en;q=0.9",
      },

      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `${response.status} ${response.statusText}`,
      );
    }

    return {
      html: await response.text(),
      url: response.url,
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchImage(
  imageUrl: string,
  referer: string,
) {
  const controller = new AbortController();

  const timeout = setTimeout(
    () => controller.abort(),
    15000,
  );

  try {
    const response = await fetch(imageUrl, {
      redirect: "follow",

      headers: {
        "user-agent": USER_AGENT,

        accept:
          "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",

        referer,
      },

      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `${response.status} ${response.statusText}`,
      );
    }

    /*
     * IMPORTANT:
     *
     * We intentionally DO NOT reject application/octet-stream.
     *
     * Sony sometimes serves valid WebP files with that MIME type.
     * sharp will inspect the actual bytes instead.
     */

    return Buffer.from(
      await response.arrayBuffer(),
    );
  } finally {
    clearTimeout(timeout);
  }
}

async function saveImage(
  slug: string,
  buffer: Buffer,
) {
  const image = sharp(buffer);

  const metadata = await image.metadata();

  if (
    !metadata.width ||
    !metadata.height ||
    metadata.width < 350 ||
    metadata.height < 250
  ) {
    throw new Error(
      `Image too small: ${metadata.width ?? 0}x${
        metadata.height ?? 0
      }`,
    );
  }

  const output = path.resolve(
    process.cwd(),
    "public/products",
    `${slug}.webp`,
  );

  fs.mkdirSync(
    path.dirname(output),
    { recursive: true },
  );

  await image
    .rotate()
    .resize({
      width: 1200,
      height: 1200,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: 90,
    })
    .toFile(output);

  return {
    output,
    width: metadata.width,
    height: metadata.height,
  };
}

async function repair(
  slug: string,
  pageUrl: string,
) {
  console.log("");
  console.log(`=== ${slug} ===`);

  const output = path.resolve(
    process.cwd(),
    "public/products",
    `${slug}.webp`,
  );

  if (fs.existsSync(output)) {
    console.log("SKIP: image already exists");
    return true;
  }

  let page;

  try {
    page = await fetchPage(pageUrl);
  } catch (error) {
    console.log(
      `PAGE FAILED: ${
        error instanceof Error
          ? error.message
          : String(error)
      }`,
    );

    return false;
  }

  const candidates = findImageCandidates(
    page.html,
    page.url,
  );

  console.log(
    `Found ${candidates.length} image candidates`,
  );

  for (
    let index = 0;
    index < candidates.length;
    index += 1
  ) {
    const candidate = candidates[index];

    try {
      console.log(
        `Trying ${index + 1}/${candidates.length}`,
      );

      const buffer = await fetchImage(
        candidate,
        page.url,
      );

      const saved = await saveImage(
        slug,
        buffer,
      );

      console.log(
        `SAVED: ${path.relative(
          process.cwd(),
          saved.output,
        )}`,
      );

      console.log(
        `SIZE: ${saved.width}x${saved.height}`,
      );

      return true;
    } catch {
      // Try next candidate.
    }
  }

  console.log("FAILED: no usable image candidate");

  return false;
}

async function main() {
  let repaired = 0;

  const failed: string[] = [];

  for (const [slug, url] of Object.entries(products)) {
    const success = await repair(
      slug,
      url,
    );

    if (success) {
      repaired += 1;
    } else {
      failed.push(slug);
    }
  }

  console.log("");
  console.log("==============================");
  console.log("IMAGE REPAIR COMPLETE");
  console.log("==============================");

  console.log(
    `Successful/existing: ${repaired}`,
  );

  console.log(
    `Still missing: ${failed.length}`,
  );

  for (const slug of failed) {
    console.log(`- ${slug}`);
  }

  if (failed.length > 0) {
    process.exitCode = 2;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
