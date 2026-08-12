export type CatalogProduct = {
  slug: string;
  name: string;
  brand: string;
  customerRating: number;
  totalReviewCount: number;
  sources: Array<{
    platform: string;
    rating: number;
    reviewCount: number;
    url: string;
    checkedAt: string;
  }>;
};

export type RatingCandidate = {
  slug: string;
  platform: string;
  productName: string;
  rating: number;
  reviewCount: number;
  url: string;
  checkedAt: string;
  matchScore: number;
  exactMatch: boolean;
  evidence: string[];
};

export type CsvRatingRow = {
  slug: string;
  platform: string;
  rating: number;
  reviewCount: number;
  url: string;
  checkedAt: string;
};
