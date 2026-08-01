import type {
  ImageCandidate,
  ImageProvider,
  ProductSourceInput,
} from "../types";
import { fetchPageHtml } from "../utils/http";
import { extractMetadataImageUrls } from "../utils/metadata";

type MetadataProviderOptions = {
  name: string;
  supportedPlatforms: string[];
};

function normalizePlatform(platform: string): string {
  return platform.trim().toLowerCase();
}

export function createMetadataProvider({
  name,
  supportedPlatforms,
}: MetadataProviderOptions): ImageProvider {
  const normalizedPlatforms = new Set(
    supportedPlatforms.map(normalizePlatform),
  );

  return {
    name,

    supports(source: ProductSourceInput): boolean {
      return normalizedPlatforms.has(
        normalizePlatform(source.platform),
      );
    },

    async findCandidates(
      source: ProductSourceInput,
    ): Promise<ImageCandidate[]> {
      const html = await fetchPageHtml(source.url);

      return extractMetadataImageUrls(html, source.url).map(
        (url) => ({
          url,
          pageUrl: source.url,
          providerName: name,
        }),
      );
    },
  };
}