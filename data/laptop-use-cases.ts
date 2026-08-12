export type LaptopUseCase =
  | "Study"
  | "Business"
  | "Engineering"
  | "Gaming"
  | "Coding";

export const laptopUseCasesBySlug: Record<string, LaptopUseCase[]> = {
  "apple-macbook-air-13-m5": ["Study", "Business", "Coding"],
  "apple-macbook-air-15-m5": ["Study", "Business", "Coding"],
  "apple-macbook-pro-14-m5": ["Business", "Engineering", "Coding"],
  "apple-macbook-pro-14-m5-pro": ["Business", "Engineering", "Coding"],
  "apple-macbook-pro-16-m5-max": ["Business", "Engineering", "Coding"],

  "dell-xps-13-2026": ["Study", "Business", "Coding"],
  "dell-xps-14-2026": ["Business", "Engineering", "Coding"],
  "dell-xps-16-2026": ["Business", "Engineering", "Coding"],

  "dell-pro-max-14-premium": ["Business", "Engineering", "Coding"],
  "dell-pro-max-16-premium": ["Business", "Engineering", "Coding"],

  "lenovo-thinkpad-x1-carbon-gen-14": ["Business", "Coding"],
  "lenovo-thinkpad-x1-carbon-gen-13": ["Business", "Coding"],

  "asus-rog-zephyrus-g14-2026": ["Gaming", "Engineering", "Coding"],
  "asus-rog-zephyrus-g16-2026": ["Gaming", "Engineering", "Coding"],

  "apple-macbook-air-13-m5-24gb": ["Study", "Business", "Coding"],
};

export function getLaptopUseCases(slug: string): LaptopUseCase[] {
  return laptopUseCasesBySlug[slug] ?? [];
}
