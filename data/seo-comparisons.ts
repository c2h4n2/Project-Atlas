export type SeoComparison = {
  slug: string;
  productSlugs: [string, string];
};

export const seoComparisons: SeoComparison[] = [
  { slug: "apple-macbook-air-13-m5-vs-apple-macbook-pro-14-m5", productSlugs: ["apple-macbook-air-13-m5", "apple-macbook-pro-14-m5"] },
  { slug: "apple-macbook-air-13-m5-vs-framework-laptop-13-ryzen-ai-300", productSlugs: ["apple-macbook-air-13-m5", "framework-laptop-13-ryzen-ai-300"] },
  { slug: "samsung-s95h-oled-55-vs-lg-c6-oled-55", productSlugs: ["samsung-s95h-oled-55", "lg-c6-oled-55"] },
  { slug: "lg-b5-oled-55-vs-samsung-s90h-oled-55", productSlugs: ["lg-b5-oled-55", "samsung-s90h-oled-55"] },
  { slug: "apple-ipad-air-11-m4-vs-apple-ipad-pro-m5-11", productSlugs: ["apple-ipad-air-11-m4", "apple-ipad-pro-m5-11"] },
  { slug: "apple-ipad-air-11-m4-vs-samsung-galaxy-tab-s11", productSlugs: ["apple-ipad-air-11-m4", "samsung-galaxy-tab-s11"] },
  { slug: "sony-alpha-a7-v-vs-canon-eos-r6-mark-iii", productSlugs: ["sony-alpha-a7-v", "canon-eos-r6-mark-iii"] },
  { slug: "asus-rog-rapture-gt-be98-pro-vs-tp-link-archer-be800", productSlugs: ["asus-rog-rapture-gt-be98-pro", "tp-link-archer-be800"] },
];

export function getSeoComparison(slug: string) {
  return seoComparisons.find((comparison) => comparison.slug === slug);
}
