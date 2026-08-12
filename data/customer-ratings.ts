export type CustomerRatingEntry = {
  platform: string;
  rating: number;
  reviewCount: number;
  url: string;
  checkedAt: string;
};

export const customerRatingsBySlug: Record<
  string,
  CustomerRatingEntry[]
> = {
  "dell-ultrasharp-u3226q": [
    {
      platform: "Best Buy",
      rating: 4.6,
      reviewCount: 72,
      url: "https://REPLACE-WITH-EXACT-PRODUCT-URL.example",
      checkedAt: "2026-08-09",
    },
  ],
};
