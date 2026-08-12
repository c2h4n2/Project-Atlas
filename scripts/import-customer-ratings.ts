import fs from "node:fs";
import path from "node:path";
import { products } from "../data/products";

type Row = {
  slug: string;
  platform: string;
  rating: number;
  reviewCount: number;
  url: string;
  checkedAt: string;
};

const inputPath =
  process.argv[2] ??
  path.resolve(process.cwd(), "customer-ratings/customer-ratings.csv");

const outputPath = path.resolve(
  process.cwd(),
  "data/customer-ratings.ts",
);

function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values.map((value) => value.trim());
}

function escapeTs(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, " ");
}

if (!fs.existsSync(inputPath)) {
  throw new Error(`CSV not found: ${inputPath}`);
}

const text = fs.readFileSync(inputPath, "utf8").replace(/^\uFEFF/, "");
const lines = text
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

if (lines.length < 2) {
  throw new Error("CSV must contain a header and at least one data row.");
}

const header = parseCsvLine(lines[0]).map((value) => value.toLowerCase());
const required = [
  "slug",
  "platform",
  "rating",
  "reviewcount",
  "url",
  "checkedat",
];

for (const field of required) {
  if (!header.includes(field)) {
    throw new Error(`Missing required CSV column: ${field}`);
  }
}

function field(values: string[], name: string) {
  const index = header.indexOf(name);
  return values[index] ?? "";
}

const productSlugs = new Set(products.map((product) => product.slug));
const rows: Row[] = [];
const seen = new Set<string>();
const errors: string[] = [];

for (let lineNumber = 2; lineNumber <= lines.length; lineNumber += 1) {
  const values = parseCsvLine(lines[lineNumber - 1]);

  const slug = field(values, "slug");
  const platform = field(values, "platform");
  const ratingText = field(values, "rating");
  const reviewCountText = field(values, "reviewcount");
  const url = field(values, "url");
  const checkedAt = field(values, "checkedat");

  const rating = Number(ratingText);
  const reviewCount = Number(reviewCountText);

  if (!productSlugs.has(slug)) {
    errors.push(`Line ${lineNumber}: unknown product slug "${slug}"`);
  }

  if (!platform) {
    errors.push(`Line ${lineNumber}: platform is required`);
  }

  if (!Number.isFinite(rating) || rating <= 0 || rating > 5) {
    errors.push(
      `Line ${lineNumber}: rating must be greater than 0 and at most 5`,
    );
  }

  if (
    !Number.isInteger(reviewCount) ||
    reviewCount <= 0
  ) {
    errors.push(
      `Line ${lineNumber}: reviewCount must be a positive integer`,
    );
  }

  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("unsupported protocol");
    }
  } catch {
    errors.push(`Line ${lineNumber}: valid http(s) URL is required`);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(checkedAt)) {
    errors.push(
      `Line ${lineNumber}: checkedAt must use YYYY-MM-DD`,
    );
  }

  const duplicateKey =
    `${slug}|${platform.toLowerCase()}|${url.toLowerCase()}`;

  if (seen.has(duplicateKey)) {
    errors.push(`Line ${lineNumber}: duplicate rating source`);
  }

  seen.add(duplicateKey);

  rows.push({
    slug,
    platform,
    rating,
    reviewCount,
    url,
    checkedAt,
  });
}

if (errors.length > 0) {
  console.error("Customer rating import failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

const bySlug = new Map<string, Row[]>();

for (const row of rows) {
  const current = bySlug.get(row.slug) ?? [];
  current.push(row);
  bySlug.set(row.slug, current);
}

const sortedSlugs = Array.from(bySlug.keys()).sort();

let output = `export type CustomerRatingEntry = {
  platform: string;
  rating: number;
  reviewCount: number;
  url: string;
  checkedAt: string;
};

export const customerRatingsBySlug: Record<
  string,
  CustomerRatingEntry[]
> = {\n`;

for (const slug of sortedSlugs) {
  output += `  "${escapeTs(slug)}": [\n`;

  for (const row of bySlug.get(slug) ?? []) {
    output += `    {
      platform: "${escapeTs(row.platform)}",
      rating: ${row.rating},
      reviewCount: ${row.reviewCount},
      url: "${escapeTs(row.url)}",
      checkedAt: "${escapeTs(row.checkedAt)}",
    },\n`;
  }

  output += "  ],\n";
}

output += "};\n";

fs.writeFileSync(outputPath, output, "utf8");

console.log(`Imported rows: ${rows.length}`);
console.log(`Products with ratings: ${bySlug.size}`);
console.log(`Generated: ${path.relative(process.cwd(), outputPath)}`);
