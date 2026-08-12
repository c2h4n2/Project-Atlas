import { aiGlasses } from "./products/ai-glasses";
import { headphonesEarbuds } from "./products/headphones-earbuds";
import { smartwatches } from "./products/smartwatches";
import { expansionTo100 } from "./products/expansion-to-100";
import { expansionTo125 } from "./products/expansion-to-125";
import { laptops } from "./products/laptops";
import { monitors } from "./products/monitors";
import { applyCustomerRatingsInPlace } from "@/lib/apply-customer-ratings";

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

export type ReviewScores = Record<string, number>;
export type ProductSpecs = Record<string, string>;
export type ProductFit = "Unisex" | "Smaller Fit" | "Larger Fit";
export type ProductFrameSize = "Small" | "Medium" | "Large";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  categoryId?: string;
  productType?: string;
  shortDescription: string;
  image: ProductImage;
  editorialScore: number;
  customerRating: number;
  totalReviewCount: number;
  qualification: "qualified" | "strong-pick" | "top-pick";
  verdictLabel: "Good" | "Very Good" | "Excellent" | "Outstanding";
  editorVerdict: string;
  fit?: ProductFit;
  frameSize?: ProductFrameSize;
  bestFor: string[];
  reviewScores: ReviewScores;
  specs: ProductSpecs;
  pros: string[];
  cons: string[];
  sources: ProductSource[];
  affiliateLinks: AffiliateLink[];
};

const normalizedAiGlasses: Product[] = aiGlasses.map((product) => ({
  ...product,
  categoryId: "ai-glasses",
  productType: "AI glasses",
}));

export const products: Product[] = [
  ...laptops,
  ...monitors,
  ...normalizedAiGlasses,
  ...headphonesEarbuds,
  ...smartwatches,
  ...expansionTo100,
  ...expansionTo125,
];

applyCustomerRatingsInPlace(products);
