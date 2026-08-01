import type {
  ImageProvider,
  ProductSourceInput,
} from "../types";
import { bestBuyProvider } from "./bestbuy";
import { metaProvider } from "./meta";
import { createMetadataProvider } from "./metadata-provider";
import { oakleyProvider } from "./oakley";
import { rayBanProvider } from "./rayban";

const genericMetadataProvider = createMetadataProvider({
  name: "Generic Metadata",
  supportedPlatforms: [],
});

const providers: ImageProvider[] = [
  metaProvider,
  rayBanProvider,
  oakleyProvider,
  bestBuyProvider,
];

export function getProviderForSource(
  source: ProductSourceInput,
): ImageProvider {
  return (
    providers.find((provider) => provider.supports(source)) ?? {
      ...genericMetadataProvider,
      supports: () => true,
    }
  );
}