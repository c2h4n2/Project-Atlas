export type ImageCandidate = {
  url: string;
  pageUrl: string;
  providerName: string;
};

export type ProductSourceInput = {
  platform: string;
  url: string;
};

export type ImageProvider = {
  name: string;
  supports: (source: ProductSourceInput) => boolean;
  findCandidates: (
    source: ProductSourceInput,
  ) => Promise<ImageCandidate[]>;
};

export type SyncStatus = "downloaded" | "skipped" | "failed";

export type SyncResult = {
  productName: string;
  productSlug: string;
  status: SyncStatus;
  outputPath?: string;
  providerName?: string;
  pageUrl?: string;
  imageUrl?: string;
  error?: string;
};

export type ImagePathUpdate = {
  currentPath: string;
  nextPath: string;
};