const STOP_WORDS = new Set([
  "the",
  "and",
  "with",
  "for",
  "inch",
  "in",
  "new",
  "latest",
  "smart",
  "wireless",
  "laptop",
  "monitor",
  "headphones",
  "earbuds",
  "watch",
  "smartwatch",
]);

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[™®©]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokens(value: string) {
  return normalize(value)
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function significantModelTokens(value: string) {
  return tokens(value).filter(
    (token) =>
      /\d/.test(token) ||
      /^(pro|max|ultra|classic|plus|gen|oled|qd|m\d|xm\d|g\d|u\d)/.test(token),
  );
}

export function scoreExactProductMatch(
  expectedName: string,
  expectedBrand: string,
  candidateName: string,
) {
  const expected = new Set(tokens(`${expectedBrand} ${expectedName}`));
  const candidate = new Set(tokens(candidateName));

  if (expected.size === 0 || candidate.size === 0) {
    return {
      score: 0,
      exact: false,
      evidence: ["Unable to tokenize product names."],
    };
  }

  let overlap = 0;
  for (const token of expected) {
    if (candidate.has(token)) overlap += 1;
  }

  const baseScore = overlap / expected.size;
  const expectedModels = significantModelTokens(expectedName);
  const missingModels = expectedModels.filter(
    (token) => !candidate.has(token),
  );

  const brandToken = tokens(expectedBrand)[0];
  const brandMatches = !brandToken || candidate.has(brandToken);

  let score = baseScore;

  if (!brandMatches) score -= 0.25;
  score -= missingModels.length * 0.12;
  score = Math.max(0, Math.min(1, score));

  const exact =
    score >= 0.78 &&
    brandMatches &&
    missingModels.length === 0;

  const evidence = [
    `Token overlap ${(baseScore * 100).toFixed(0)}%`,
    brandMatches ? "Brand matched" : "Brand did not match",
    missingModels.length === 0
      ? "All significant model/configuration tokens matched"
      : `Missing model/configuration tokens: ${missingModels.join(", ")}`,
  ];

  return { score, exact, evidence };
}
