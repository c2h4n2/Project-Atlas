import { createMetadataProvider } from "./metadata-provider";

export const metaProvider = createMetadataProvider({
  name: "Meta",
  supportedPlatforms: ["Meta"],
});
