import fs from "node:fs";
import type { CsvRatingRow } from "./types";

export function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (quoted && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }

    if (char === "," && !quoted) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values.map((value) => value.trim());
}

export function escapeCsv(value: string | number) {
  const text = String(value);
  if (!/[",\n]/.test(text)) return text;
  return `"${text.replace(/"/g, '""')}"`;
}

export function readExistingRatings(file: string): CsvRatingRow[] {
  if (!fs.existsSync(file)) return [];

  const lines = fs
    .readFileSync(file, "utf8")
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .filter(Boolean);

  if (lines.length < 2) return [];

  const header = parseCsvLine(lines[0]).map((value) =>
    value.toLowerCase(),
  );

  function get(values: string[], field: string) {
    const index = header.indexOf(field);
    return index >= 0 ? values[index] ?? "" : "";
  }

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);

    return {
      slug: get(values, "slug"),
      platform: get(values, "platform"),
      rating: Number(get(values, "rating")),
      reviewCount: Number(get(values, "reviewcount")),
      url: get(values, "url"),
      checkedAt: get(values, "checkedat"),
    };
  });
}

export function writeRatings(file: string, rows: CsvRatingRow[]) {
  const header =
    "slug,platform,rating,reviewCount,url,checkedAt";

  const body = rows.map((row) =>
    [
      row.slug,
      row.platform,
      row.rating.toFixed(2).replace(/\.?0+$/, ""),
      row.reviewCount,
      row.url,
      row.checkedAt,
    ]
      .map(escapeCsv)
      .join(","),
  );

  fs.writeFileSync(file, `${header}\n${body.join("\n")}\n`, "utf8");
}
