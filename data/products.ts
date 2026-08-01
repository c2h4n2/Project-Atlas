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

export const products: Product[] = [
  {
    id: "ray-ban-meta-wayfarer-gen-2",
    slug: "ray-ban-meta-wayfarer-gen-2",
    name: "Ray-Ban Meta Wayfarer (Gen 2)",
    brand: "Ray-Ban Meta",
    category: "AI Glasses",
    shortDescription:
      "Second-generation AI glasses with a 12 MP camera, 3K video, improved battery life, open-ear audio, live translation, and Meta AI.",
    image: {
      src: "/products/ray-ban-meta-wayfarer-gen-2.webp",
      alt: "Ray-Ban Meta Wayfarer Gen 2 AI glasses",
    },
    editorialScore: 9.2,
    customerRating: 4.7,
    totalReviewCount: 1383,
    qualification: "top-pick",
    verdictLabel: "Outstanding",
    editorVerdict:
      "The Ray-Ban Meta Wayfarer Gen 2 is our current best overall AI-glasses pick. It combines longer battery life, upgraded 3K video, useful Meta AI features, open-ear audio, and a familiar Wayfarer design that feels more natural for everyday use than many competing smart glasses.",
    fit: "Unisex",
    frameSize: "Medium",
    bestFor: [
      "Best overall AI-glasses experience",
      "Frequent travelers",
      "Hands-free content creation",
      "Everyday calls and open-ear audio",
      "Buyers who want the newest Ray-Ban Meta hardware",
    ],
    reviewScores: {
      design: 9.4,
      comfort: 9.0,
      camera: 9.3,
      audio: 9.0,
      battery: 9.2,
      aiFeatures: 9.5,
      value: 8.8,
    },
    specs: {
      weight: "Varies by frame size and lens configuration",
      battery: "Up to 8 hours of typical use on a single charge",
      camera: "12 MP ultra-wide camera",
      microphones: "Five-microphone array",
      speakers: "Open-ear stereo speakers",
      frameStyles: "Wayfarer standard and large frame options",
      prescriptionLenses: "Compatible prescription lenses available",
      voiceAssistant: "Meta AI",
      videoResolution: "Up to 3K Ultra HD video capture",
    },
    pros: [
      "Up to twice the battery life of the earlier generation",
      "Sharper 3K hands-free video",
      "Large customer-review volume",
      "Useful Meta AI and live-translation features",
      "Classic Wayfarer styling",
    ],
    cons: [
      "Costs more than the previous generation",
      "Camera use can raise privacy concerns",
      "Some AI features require internet access",
      "Feature availability can vary by region and language",
    ],
    sources: [
      {
        platform: "Meta",
        rating: 0,
        reviewCount: 0,
        url: "https://www.meta.com/ai-glasses/ray-ban-meta-wayfarer-gen-2/",
        checkedAt: "2026-07-30",
      },
      {
        platform: "Best Buy",
        rating: 4.7,
        reviewCount: 1383,
        url: "https://www.bestbuy.com/product/ray-ban-meta-wayfarer-gen-2-glasses-with-meta-ai-audio-photo-video-compatibility-polarized-graphite-lenses-matte-black/BCKFSGRX8R",
        checkedAt: "2026-07-30",
      },
    ],
    affiliateLinks: [
      {
        retailer: "Best Buy",
        url: "",
      },
    ],
  },
  {
    id: "ray-ban-meta-wayfarer-gen-1",
    slug: "ray-ban-meta-wayfarer-gen-1",
    name: "Ray-Ban Meta Wayfarer (Gen 1)",
    brand: "Ray-Ban Meta",
    category: "AI Glasses",
    shortDescription:
      "First-generation Ray-Ban Meta glasses with a 12 MP camera, open-ear audio, hands-free calling, photo and video capture, and Meta AI.",
    image: {
      src: "/products/ray-ban-meta-wayfarer-gen-1.webp",
      alt: "Ray-Ban Meta Wayfarer Gen 1 AI glasses",
    },
    editorialScore: 8.8,
    customerRating: 4.7,
    totalReviewCount: 3543,
    qualification: "top-pick",
    verdictLabel: "Excellent",
    editorVerdict:
      "The Ray-Ban Meta Wayfarer Gen 1 remains a strong choice for buyers who want practical smart-glasses features in a familiar design. Its camera, open-ear audio, calling features, and Meta AI tools remain useful, especially when value matters more than owning the latest hardware.",
    fit: "Unisex",
    frameSize: "Medium",
    bestFor: [
      "First-time smart-glasses buyers",
      "Everyday hands-free use",
      "Casual photo and video capture",
      "Open-ear audio and calling",
      "Buyers prioritizing value",
    ],
    reviewScores: {
      design: 9.2,
      comfort: 8.8,
      camera: 8.5,
      audio: 8.6,
      battery: 8.1,
      aiFeatures: 8.7,
      value: 9.0,
    },
    specs: {
      weight: "Varies by frame size and lens configuration",
      battery: "Up to approximately 4 hours with typical use",
      camera: "12 MP ultra-wide camera",
      microphones: "Five-microphone array",
      speakers: "Open-ear stereo speakers",
      frameStyles: "Wayfarer standard and large frame options",
      prescriptionLenses: "Compatible prescription lenses available",
      voiceAssistant: "Meta AI",
      videoResolution: "Up to 1080p video capture",
    },
    pros: [
      "Extensive customer-review history",
      "Traditional Ray-Ban styling",
      "Hands-free photo and video capture",
      "Open-ear speakers and calling",
      "Often represents better value than Gen 2",
    ],
    cons: [
      "Shorter battery life than Gen 2",
      "Lower maximum video resolution than Gen 2",
      "Camera use can raise privacy concerns",
      "Some AI features depend on internet access",
    ],
    sources: [
      {
        platform: "Meta",
        rating: 0,
        reviewCount: 0,
        url: "https://www.meta.com/ai-glasses/wayfarer/",
        checkedAt: "2026-07-31",
      },
      {
        platform: "Best Buy",
        rating: 4.7,
        reviewCount: 3543,
        url: "https://www.bestbuy.com/product/ray-ban-meta-wayfarer-gen-1-smart-ai-glasses-for-men-women-camera-audio-video-recording-green-lenses-shiny-black/BCKVZQ48PC",
        checkedAt: "2026-07-30",
      },
    ],
    affiliateLinks: [
      {
        retailer: "Best Buy",
        url: "",
      },
    ],
  },
  {
    id: "oakley-meta-hstn",
    slug: "oakley-meta-hstn",
    name: "Oakley Meta HSTN",
    brand: "Oakley Meta",
    category: "AI Glasses",
    shortDescription:
      "Performance-focused Meta AI glasses with Oakley styling, a 12 MP camera, 3K video, open-ear audio, and longer battery life.",
    image: {
      src: "/products/oakley-meta-hstn.webp",
      alt: "Oakley Meta HSTN AI glasses",
    },
    editorialScore: 8.9,
    customerRating: 4.5,
    totalReviewCount: 516,
    qualification: "strong-pick",
    verdictLabel: "Excellent",
    editorVerdict:
      "The Oakley Meta HSTN is the strongest choice in this group for buyers who prefer a sport-oriented frame and a more secure fit. It combines Meta AI, open-ear audio, a 12 MP camera, 3K video, and strong battery performance, although its bold design will not suit every buyer.",
    fit: "Larger Fit",
    frameSize: "Large",
    bestFor: [
      "Outdoor and active use",
      "Buyers who prefer Oakley styling",
      "Longer daily battery life",
      "Hands-free point-of-view recording",
      "Secure sport-oriented fit",
    ],
    reviewScores: {
      design: 8.8,
      comfort: 8.6,
      camera: 9.2,
      audio: 8.8,
      battery: 9.3,
      aiFeatures: 9.2,
      value: 8.4,
    },
    specs: {
      weight: "Approximately 53 grams, depending on configuration",
      battery: "Up to 8 hours of typical use on a single charge",
      camera: "12 MP ultra-wide camera",
      microphones: "Multi-microphone voice and recording system",
      speakers: "Open-ear stereo speakers",
      frameStyles: "Oakley HSTN performance-lifestyle frame",
      prescriptionLenses: "Compatible prescription options may be available",
      voiceAssistant: "Meta AI",
      videoResolution: "Up to 3K video capture",
    },
    pros: [
      "Strong battery performance",
      "Clear 12 MP photo capture",
      "3K hands-free video",
      "Secure fit for active use",
      "Oakley lens and frame options",
    ],
    cons: [
      "Bolder and bulkier than Ray-Ban Meta frames",
      "Can feel heavier during extended use",
      "Sport styling is less discreet",
      "Some Meta AI features vary by region",
    ],
    sources: [
      {
        platform: "Meta",
        rating: 0,
        reviewCount: 0,
        url: "https://www.meta.com/ai-glasses/oakley-meta-hstn/",
        checkedAt: "2026-07-31",
      },
      {
        platform: "Oakley",
        rating: 0,
        reviewCount: 0,
        url: "https://www.oakley.com/en-us/product/W0OW8002",
        checkedAt: "2026-07-30",
      },
      {
        platform: "Best Buy",
        rating: 4.5,
        reviewCount: 516,
        url: "https://www.bestbuy.com/product/oakley-meta-hstn-glasses-with-meta-ai-audio-photo-video-compatibility-prizm-polarized-lenses-black/J3Z64P8TRR",
        checkedAt: "2026-07-30",
      },
    ],
    affiliateLinks: [
      {
        retailer: "Best Buy",
        url: "",
      },
    ],
  },
  {
    id: "ray-ban-meta-skyler-gen-2",
    slug: "ray-ban-meta-skyler-gen-2",
    name: "Ray-Ban Meta Skyler (Gen 2)",
    brand: "Ray-Ban Meta",
    category: "AI Glasses",
    shortDescription:
      "A softer cat-eye-inspired Ray-Ban Meta design with 3K video, an integrated camera, open-ear audio, live translation, and Meta AI.",
    image: {
      src: "/products/ray-ban-meta-skyler-gen-2.webp",
      alt: "Ray-Ban Meta Skyler Gen 2 AI glasses",
    },
    editorialScore: 8.8,
    customerRating: 4.7,
    totalReviewCount: 78,
    qualification: "strong-pick",
    verdictLabel: "Excellent",
    editorVerdict:
      "The Ray-Ban Meta Skyler Gen 2 provides nearly the same core smart features as the Wayfarer Gen 2 in a softer, more fashion-focused frame. It is a compelling alternative for buyers who like Meta AI and hands-free capture but do not prefer the traditional Wayfarer shape.",
    fit: "Smaller Fit",
    frameSize: "Small",
    bestFor: [
      "Buyers who prefer a softer frame shape",
      "Fashion-conscious everyday wear",
      "Hands-free photos and video",
      "Live translation while traveling",
      "Open-ear calls and music",
    ],
    reviewScores: {
      design: 9.3,
      comfort: 8.9,
      camera: 9.2,
      audio: 9.0,
      battery: 9.1,
      aiFeatures: 9.4,
      value: 8.5,
    },
    specs: {
      weight: "Varies by lens and frame configuration",
      battery: "Up to 8 hours of typical use on a single charge",
      camera: "12 MP ultra-wide camera",
      microphones: "Five-microphone array",
      speakers: "Open-ear stereo speakers",
      frameStyles: "Skyler cat-eye-inspired frame",
      prescriptionLenses: "Compatible prescription lenses available",
      voiceAssistant: "Meta AI",
      videoResolution: "Up to 3K Ultra HD video capture",
    },
    pros: [
      "Distinctive fashion-oriented design",
      "Up to 8 hours of typical battery life",
      "3K hands-free video",
      "Meta AI and live translation",
      "Strong early customer rating",
    ],
    cons: [
      "Smaller review sample than the Wayfarer",
      "Frame shape will not suit every face",
      "More expensive lens options increase total cost",
      "Internet access is needed for some AI features",
    ],
    sources: [
      {
        platform: "Meta",
        rating: 0,
        reviewCount: 0,
        url: "https://www.meta.com/ai-glasses/ray-ban-meta-skyler-gen-2/",
        checkedAt: "2026-07-31",
      },
      {
        platform: "Ray-Ban",
        rating: 0,
        reviewCount: 0,
        url: "https://www.ray-ban.com/usa/electronics/RW4014ray-ban%20meta%20skyler%20-%20gen%202-black/8056262721254",
        checkedAt: "2026-07-30",
      },
      {
        platform: "Best Buy",
        rating: 4.7,
        reviewCount: 78,
        url: "https://www.bestbuy.com/product/ray-ban-meta-skyler-gen-2-glasses-with-meta-ai-audio-photo-video-compatibility-polarized-graphite-lenses-shiny-black/BCKFSGRX7X",
        checkedAt: "2026-07-30",
      },
    ],
    affiliateLinks: [
      {
        retailer: "Best Buy",
        url: "",
      },
    ],
  },
  {
    id: "ray-ban-meta-headliner-gen-2",
    slug: "ray-ban-meta-headliner-gen-2",
    name: "Ray-Ban Meta Headliner (Gen 2)",
    brand: "Ray-Ban Meta",
    category: "AI Glasses",
    shortDescription:
      "Rounder Ray-Ban Meta glasses with a keyhole bridge, 3K video, improved battery life, open-ear audio, and Meta AI.",
    image: {
      src: "/products/ray-ban-meta-headliner-gen-2.webp",
      alt: "Ray-Ban Meta Headliner Gen 2 AI glasses",
    },
    editorialScore: 8.7,
    customerRating: 4.6,
    totalReviewCount: 78,
    qualification: "strong-pick",
    verdictLabel: "Excellent",
    editorVerdict:
      "The Ray-Ban Meta Headliner Gen 2 is a strong alternative to the Wayfarer for buyers who prefer a rounder frame and keyhole bridge. Its core camera, audio, battery, and Meta AI experience is competitive, but its lower review volume makes it a slightly less proven choice.",
    fit: "Unisex",
    frameSize: "Medium",
    bestFor: [
      "Buyers who prefer rounder frames",
      "Everyday lifestyle use",
      "Hands-free family and travel videos",
      "Open-ear audio and calling",
      "Meta AI in a less angular frame",
    ],
    reviewScores: {
      design: 9.1,
      comfort: 8.9,
      camera: 9.2,
      audio: 8.9,
      battery: 9.1,
      aiFeatures: 9.4,
      value: 8.4,
    },
    specs: {
      weight: "Varies by frame and lens configuration",
      battery: "Up to 8 hours of typical use on a single charge",
      camera: "12 MP ultra-wide camera",
      microphones: "Five-microphone array",
      speakers: "Open-ear stereo speakers",
      frameStyles: "Headliner round frame with keyhole bridge",
      prescriptionLenses: "Compatible prescription lenses available",
      voiceAssistant: "Meta AI",
      videoResolution: "Up to 3K Ultra HD video capture",
    },
    pros: [
      "Rounder alternative to the Wayfarer",
      "3K hands-free video capture",
      "Improved Gen 2 battery life",
      "Meta AI and live translation",
      "Strong photo-quality feedback",
    ],
    cons: [
      "Lower review volume than the Wayfarer",
      "Fit depends heavily on face and bridge shape",
      "Costs more than many Gen 1 configurations",
      "Some smart features require a data connection",
    ],
    sources: [
      {
        platform: "Meta",
        rating: 0,
        reviewCount: 0,
        url: "https://www.meta.com/ai-glasses/ray-ban-meta-headliner-gen-2/",
        checkedAt: "2026-07-31",
      },
      {
        platform: "Ray-Ban",
        rating: 0,
        reviewCount: 0,
        url: "https://www.ray-ban.com/usa/electronics/RW4013ray-ban%20meta%20headliner%20-%20gen%202-black/8056262721315",
        checkedAt: "2026-07-30",
      },
      {
        platform: "Best Buy",
        rating: 4.6,
        reviewCount: 78,
        url: "https://www.bestbuy.com/product/ray-ban-meta-headliner-gen-2-glasses-with-meta-ai-audio-photo-video-compatibility-transitions-sapphire-lenses-shiny-black/BCKFSGRXCQ",
        checkedAt: "2026-07-30",
      },
    ],
    affiliateLinks: [
      {
        retailer: "Best Buy",
        url: "",
      },
    ],
  },
];