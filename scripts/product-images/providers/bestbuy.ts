import { createMetadataProvider } from "./metadata-provider";

export const bestBuyProvider = createMetadataProvider({
  name: "Best Buy",
  supportedPlatforms: ["Best Buy", "BestBuy"],
});