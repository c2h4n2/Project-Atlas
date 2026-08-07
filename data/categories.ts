import type { Product } from "./products";

export type CategoryConfig = {
  id: string;
  label: string;
  href: string;
  bestHref: string;
  compareHref: string;
  scoreLabels: Record<string, string>;
  cardFields: {
    label: string;
    getValue: (product: Product) => string;
  }[];
};

export const categories: CategoryConfig[] = [
  {
    id: "ai-glasses",
    label: "AI Glasses",
    href: "/ai-glasses",
    bestHref: "/best-ai-glasses",
    compareHref: "/compare?category=ai-glasses",
    scoreLabels: {
      design: "Design",
      comfort: "Comfort",
      camera: "Camera",
      audio: "Audio",
      battery: "Battery",
      aiFeatures: "AI Features",
      value: "Value",
    },
    cardFields: [
      { label: "Fit", getValue: (product) => product.fit ?? "Unisex" },
      {
        label: "Frame size",
        getValue: (product) => product.frameSize ?? "Medium",
      },
    ],
  },
  {
    id: "headphones-earbuds",
    label: "Headphones & Earbuds",
    href: "/headphones-earbuds",
    bestHref: "/best-headphones-earbuds",
    compareHref: "/compare?category=headphones-earbuds",
    scoreLabels: {
      design: "Design",
      comfort: "Comfort",
      soundQuality: "Sound quality",
      noiseCancellation: "Noise cancellation",
      callQuality: "Call quality",
      battery: "Battery",
      value: "Value",
    },
    cardFields: [
      {
        label: "Type",
        getValue: (product) => product.productType ?? "Wireless audio",
      },
      {
        label: "Battery",
        getValue: (product) => product.specs.battery ?? "Varies",
      },
    ],
  },
];

export function getCategory(categoryId: string) {
  return categories.find((category) => category.id === categoryId);
}

export function getCategoryForPath(pathname: string) {
  if (
    pathname.startsWith("/ai-glasses") ||
    pathname.startsWith("/best-ai-glasses")
  ) {
    return getCategory("ai-glasses") ?? null;
  }

  if (
    pathname.startsWith("/headphones-earbuds") ||
    pathname.startsWith("/best-headphones-earbuds")
  ) {
    return getCategory("headphones-earbuds") ?? null;
  }

  return null;
}
