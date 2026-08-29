import type { Product } from "./products";

export type CategoryConfig = {
  id: string;
  label: string;
  href: string;
  bestHref: string;
  compareHref: string;
  description: string;
  scoreLabels: Record<string, string>;
  cardFields: {
    label: string;
    getValue: (product: Product) => string;
  }[];
};

export const categories: CategoryConfig[] = [
  {
    id: "laptops",
    label: "Laptops",
    href: "/laptops",
    bestHref: "/best-laptops",
    compareHref: "/compare?category=laptops",
    description: "Portable computers for school, work, coding, creative projects, and gaming.",
    scoreLabels: { design: "Design", portability: "Portability", display: "Display", performance: "Performance", battery: "Battery", keyboard: "Keyboard", connectivity: "Connectivity", value: "Value" },
    cardFields: [
      { label: "Processor", getValue: (product) => product.specs.processor ?? "Varies" },
      { label: "Display", getValue: (product) => product.specs.display ?? "Varies" },
    ],
  },
  {
    id: "monitors",
    label: "Monitors",
    href: "/monitors",
    bestHref: "/best-monitors",
    compareHref: "/compare?category=monitors",
    description: "Displays for productivity, creative work, high-refresh gaming, and mixed use.",
    scoreLabels: { design: "Design", imageQuality: "Image quality", color: "Color", motion: "Motion", connectivity: "Connectivity", ergonomics: "Ergonomics", hdr: "HDR", value: "Value" },
    cardFields: [
      { label: "Panel", getValue: (product) => product.specs.panel ?? "Varies" },
      { label: "Refresh", getValue: (product) => product.specs.refreshRate ?? "Varies" },
    ],
  },
  {
    id: "ai-glasses",
    label: "AI Glasses",
    href: "/ai-glasses",
    bestHref: "/best-ai-glasses",
    compareHref: "/compare?category=ai-glasses",
    description: "Wearable AI and camera glasses for hands-free capture, audio, and assistant features.",
    scoreLabels: { design: "Design", comfort: "Comfort", camera: "Camera", audio: "Audio", battery: "Battery", aiFeatures: "AI Features", value: "Value" },
    cardFields: [
      { label: "Fit", getValue: (product) => product.fit ?? "Unisex" },
      { label: "Frame size", getValue: (product) => product.frameSize ?? "Medium" },
    ],
  },
  {
    id: "headphones-earbuds",
    label: "Headphones & Earbuds",
    href: "/headphones-earbuds",
    bestHref: "/best-headphones-earbuds",
    compareHref: "/compare?category=headphones-earbuds",
    description: "Wireless audio for travel, calls, workouts, focused listening, and everyday use.",
    scoreLabels: { design: "Design", comfort: "Comfort", soundQuality: "Sound quality", noiseCancellation: "Noise cancellation", callQuality: "Call quality", battery: "Battery", value: "Value" },
    cardFields: [
      { label: "Type", getValue: (product) => product.productType ?? "Wireless audio" },
      { label: "Battery", getValue: (product) => product.specs.battery ?? "Varies" },
    ],
  },
  {
    id: "smartwatches",
    label: "Smartwatches",
    href: "/smartwatches",
    bestHref: "/best-smartwatches",
    compareHref: "/compare?category=smartwatches",
    description: "Wearables for notifications, health tracking, workouts, navigation, and daily routines.",
    scoreLabels: { design: "Design", comfort: "Comfort", display: "Display", healthTracking: "Health tracking", fitnessTracking: "Fitness tracking", battery: "Battery", smartFeatures: "Smart features", value: "Value" },
    cardFields: [
      { label: "Platform", getValue: (product) => product.specs.compatibility ?? "Varies" },
      { label: "Battery", getValue: (product) => product.specs.battery ?? "Varies" },
    ],
  },
  {
    id: "tablets",
    label: "Tablets",
    href: "/tablets",
    bestHref: "/best-tablets",
    compareHref: "/compare?category=tablets",
    description: "Portable touch devices for school, entertainment, note taking, creative work, and travel.",
    scoreLabels: { design: "Design", display: "Display", performance: "Performance", battery: "Battery", software: "Software", accessories: "Accessories", value: "Value" },
    cardFields: [
      { label: "Display", getValue: (product) => product.specs.display ?? "Varies" },
      { label: "Processor", getValue: (product) => product.specs.processor ?? "Varies" },
    ],
  },
  {
    id: "tvs",
    label: "TVs",
    href: "/tvs",
    bestHref: "/best-tvs",
    compareHref: "/compare?category=tvs",
    description: "OLED and mini-LED televisions for movies, streaming, sports, and console gaming.",
    scoreLabels: { design: "Design", pictureQuality: "Picture quality", hdr: "HDR", motion: "Motion", gaming: "Gaming", smartTv: "Smart TV", sound: "Sound", value: "Value" },
    cardFields: [
      { label: "Display", getValue: (product) => product.specs.display ?? "Varies" },
      { label: "Platform", getValue: (product) => product.specs.platform ?? "Varies" },
    ],
  },
  {
    id: "cameras",
    label: "Cameras",
    href: "/cameras",
    bestHref: "/best-cameras",
    compareHref: "/compare?category=cameras",
    description: "Mirrorless cameras for photography, travel, video creation, and hybrid shooting.",
    scoreLabels: { design: "Design", imageQuality: "Image quality", autofocus: "Autofocus", video: "Video", stabilization: "Stabilization", handling: "Handling", battery: "Battery", value: "Value" },
    cardFields: [
      { label: "Sensor", getValue: (product) => product.specs.sensor ?? "Varies" },
      { label: "Mount", getValue: (product) => product.specs.mount ?? "Varies" },
    ],
  },
];

export function getCategory(categoryId: string) {
  return categories.find((category) => category.id === categoryId);
}

export function getCategoryForPath(pathname: string) {
  return (
    categories.find(
      (category) =>
        pathname.startsWith(category.href) ||
        pathname.startsWith(category.bestHref),
    ) ?? null
  );
}
