export type SeoComparison = {
  slug: string;
  productSlugs: [string, string];
};

export const seoComparisons: SeoComparison[] = [
  // Existing comparisons
  {
    slug: "apple-macbook-air-13-m5-vs-apple-macbook-pro-14-m5",
    productSlugs: [
      "apple-macbook-air-13-m5",
      "apple-macbook-pro-14-m5",
    ],
  },
  {
    slug: "apple-macbook-air-13-m5-vs-framework-laptop-13-ryzen-ai-300",
    productSlugs: [
      "apple-macbook-air-13-m5",
      "framework-laptop-13-ryzen-ai-300",
    ],
  },
  {
    slug: "samsung-s95h-oled-55-vs-lg-c6-oled-55",
    productSlugs: [
      "samsung-s95h-oled-55",
      "lg-c6-oled-55",
    ],
  },
  {
    slug: "lg-b5-oled-55-vs-samsung-s90h-oled-55",
    productSlugs: [
      "lg-b5-oled-55",
      "samsung-s90h-oled-55",
    ],
  },
  {
    slug: "apple-ipad-air-11-m4-vs-apple-ipad-pro-m5-11",
    productSlugs: [
      "apple-ipad-air-11-m4",
      "apple-ipad-pro-m5-11",
    ],
  },
  {
    slug: "apple-ipad-air-11-m4-vs-samsung-galaxy-tab-s11",
    productSlugs: [
      "apple-ipad-air-11-m4",
      "samsung-galaxy-tab-s11",
    ],
  },
  {
    slug: "sony-alpha-a7-v-vs-canon-eos-r6-mark-iii",
    productSlugs: [
      "sony-alpha-a7-v",
      "canon-eos-r6-mark-iii",
    ],
  },
  {
    slug: "asus-rog-rapture-gt-be98-pro-vs-tp-link-archer-be800",
    productSlugs: [
      "asus-rog-rapture-gt-be98-pro",
      "tp-link-archer-be800",
    ],
  },

  // Laptops
  {
    slug: "apple-macbook-pro-16-m5-max-vs-apple-macbook-pro-14-m5-pro",
    productSlugs: [
      "apple-macbook-pro-16-m5-max",
      "apple-macbook-pro-14-m5-pro",
    ],
  },
  {
    slug: "apple-macbook-air-15-m5-vs-lenovo-thinkpad-x1-carbon-gen-14",
    productSlugs: [
      "apple-macbook-air-15-m5",
      "lenovo-thinkpad-x1-carbon-gen-14",
    ],
  },

  // Monitors
  {
    slug: "asus-rog-swift-pg32ucdm3-vs-asus-rog-swift-pg32ucwm",
    productSlugs: [
      "asus-rog-swift-pg32ucdm3",
      "asus-rog-swift-pg32ucwm",
    ],
  },
  {
    slug: "dell-ultrasharp-u3226q-vs-alienware-aw3225qf",
    productSlugs: [
      "dell-ultrasharp-u3226q",
      "alienware-aw3225qf",
    ],
  },

  // Headphones & earbuds
  {
    slug: "sony-wh-1000xm6-vs-sennheiser-momentum-5-wireless",
    productSlugs: [
      "sony-wh-1000xm6",
      "sennheiser-momentum-5-wireless",
    ],
  },
  {
    slug: "samsung-galaxy-buds4-pro-vs-apple-airpods-pro-3",
    productSlugs: [
      "samsung-galaxy-buds4-pro",
      "apple-airpods-pro-3",
    ],
  },

  // Smartwatches
  {
    slug: "apple-watch-series-11-vs-apple-watch-ultra-3",
    productSlugs: [
      "apple-watch-series-11",
      "apple-watch-ultra-3",
    ],
  },
  {
    slug: "samsung-galaxy-watch9-vs-google-pixel-watch-4-45mm",
    productSlugs: [
      "samsung-galaxy-watch9",
      "google-pixel-watch-4-45mm",
    ],
  },

  // TVs
  {
    slug: "samsung-s95h-oled-55-vs-sony-bravia-9-ii-65",
    productSlugs: [
      "samsung-s95h-oled-55",
      "sony-bravia-9-ii-65",
    ],
  },
  {
    slug: "lg-c6-oled-55-vs-sony-bravia-7-ii-65",
    productSlugs: [
      "lg-c6-oled-55",
      "sony-bravia-7-ii-65",
    ],
  },

  // Routers
  {
    slug: "asus-zenwifi-bq16-pro-vs-netgear-orbi-970-series",
    productSlugs: [
      "asus-zenwifi-bq16-pro",
      "netgear-orbi-970-series",
    ],
  },
  {
    slug: "netgear-nighthawk-rs700s-vs-asus-rt-be96u",
    productSlugs: [
      "netgear-nighthawk-rs700s",
      "asus-rt-be96u",
    ],
  },

  // Tablets
  {
    slug: "apple-ipad-pro-m5-13-vs-apple-ipad-pro-m5-11",
    productSlugs: [
      "apple-ipad-pro-m5-13",
      "apple-ipad-pro-m5-11",
    ],
  },
  {
    slug: "samsung-galaxy-tab-s11-vs-oneplus-pad-3",
    productSlugs: [
      "samsung-galaxy-tab-s11",
      "oneplus-pad-3",
    ],
  },

  // Cameras
  {
    slug: "sony-a6700-vs-fujifilm-x-t5",
    productSlugs: [
      "sony-a6700",
      "fujifilm-x-t5",
    ],
  },
  {
    slug: "nikon-z5ii-vs-sony-a7c-ii",
    productSlugs: [
      "nikon-z5ii",
      "sony-a7c-ii",
    ],
  },

  // SSDs
  {
    slug: "wd-black-sn8100-2tb-vs-samsung-9100-pro-2tb",
    productSlugs: [
      "wd-black-sn8100-2tb",
      "samsung-9100-pro-2tb",
    ],
  },
  {
    slug: "samsung-990-pro-2tb-vs-wd-black-sn850x-2tb",
    productSlugs: [
      "samsung-990-pro-2tb",
      "wd-black-sn850x-2tb",
    ],
  },

  // Keyboards
  {
    slug: "wooting-60he-v2-vs-wooting-80he",
    productSlugs: [
      "wooting-60he-v2",
      "wooting-80he",
    ],
  },

  // Mice
  {
    slug: "razer-viper-v3-pro-vs-razer-deathadder-v4-pro",
    productSlugs: [
      "razer-viper-v3-pro",
      "razer-deathadder-v4-pro",
    ],
  },
];

export function getSeoComparison(slug: string) {
  return seoComparisons.find(
    (comparison) => comparison.slug === slug,
  );
}
