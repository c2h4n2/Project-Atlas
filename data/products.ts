import { aiGlasses } from "./products/ai-glasses";

export type ProductSource = {
  platform: string;
  rating: number;
  reviewCount: number;
  url: string;
  checkedAt: string;
};

export type AffiliateLink = {
  retailer: string;
  url: string;
};

export type ProductImage = {
  src: string;
  alt: string;
  sourceUrl?: string;
};

export type ReviewScores = {
  design: number;
  comfort: number;
  camera: number;
  audio: number;
  battery: number;
  aiFeatures: number;
  value: number;
};

export type ProductSpecs = {
  weight: string;
  battery: string;
  camera: string;
  microphones: string;
  speakers: string;
  frameStyles: string;
  prescriptionLenses: string;
  voiceAssistant: string;
  videoResolution: string;
};

export type ProductFit = "Unisex" | "Smaller Fit" | "Larger Fit";

export type ProductFrameSize = "Small" | "Medium" | "Large";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  shortDescription: string;
  image: ProductImage;
  editorialScore: number;
  customerRating: number;
  totalReviewCount: number;
  qualification: "qualified" | "strong-pick" | "top-pick";
  verdictLabel: "Good" | "Very Good" | "Excellent" | "Outstanding";
  editorVerdict: string;
  fit: ProductFit;
  frameSize: ProductFrameSize;
  bestFor: string[];
  reviewScores: ReviewScores;
  specs: ProductSpecs;
  pros: string[];
  cons: string[];
  sources: ProductSource[];
  affiliateLinks: AffiliateLink[];
};

export const products: Product[] = [...aiGlasses];
