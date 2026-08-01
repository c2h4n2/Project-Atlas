import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import { products } from "@/data/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const scoreLabels = {
  design: "Design",
  comfort: "Comfort",
  camera: "Camera",
  audio: "Audio",
  battery: "Battery",
  aiFeatures: "AI Features",
  value: "Value",
};

const specLabels = {
  weight: "Weight",
  battery: "Battery",
  camera: "Camera",
  microphones: "Microphones",
  speakers: "Speakers",
  frameStyles: "Frame styles",
  prescriptionLenses: "Prescription lenses",
  voiceAssistant: "Voice assistant",
  videoResolution: "Video resolution",
};

function getSiteUrl() {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredSiteUrl) {
    return "http://localhost:3000";
  }

  return configuredSiteUrl.replace(/\/$/, "");
}

function getAbsoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${getSiteUrl()}${normalizedPath}`;
}

function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function getScoreBarClass(score: number) {
  if (score >= 9) {
    return "bg-emerald-400";
  }

  if (score >= 8) {
    return "bg-cyan-400";
  }

  if (score >= 7) {
    return "bg-amber-400";
  }

  return "bg-orange-400";
}

function getQualificationLabel(
  qualification: "qualified" | "strong-pick" | "top-pick",
) {
  switch (qualification) {
    case "top-pick":
      return "Top Pick";

    case "strong-pick":
      return "Strong Pick";

    default:
      return "Qualified";
  }
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return {};
  }

  const title = `${product.name} Review`;
  const description = product.shortDescription;
  const productUrl = getAbsoluteUrl(`/products/${product.slug}`);
  const imageUrl = getAbsoluteUrl(product.image.src);

  return {
    title,
    description,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: productUrl,
      siteName: "Project Atlas",
      images: [
        {
          url: imageUrl,
          alt: product.image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const affiliateLinks = product.affiliateLinks.filter(
    (link) => link.url.trim() !== "",
  );

  const reviewScores = Object.entries(product.reviewScores) as [
    keyof typeof product.reviewScores,
    number,
  ][];

  const specifications = Object.entries(product.specs) as [
    keyof typeof product.specs,
    string,
  ][];

  const qualificationLabel = getQualificationLabel(product.qualification);
  const productUrl = getAbsoluteUrl(`/products/${product.slug}`);
  const imageUrl = getAbsoluteUrl(product.image.src);
  const categoryUrl = getAbsoluteUrl("/ai-glasses");
  const homeUrl = getAbsoluteUrl("/");

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${productUrl}#product`,
        name: product.name,
        description: product.shortDescription,
        image: [imageUrl],
        url: productUrl,
        brand: {
          "@type": "Brand",
          name: product.brand,
        },
        category: product.category,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.customerRating,
          reviewCount: product.totalReviewCount,
          bestRating: 5,
          worstRating: 1,
        },
        review: {
          "@id": `${productUrl}#review`,
        },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Fit",
            value: product.fit,
          },
          {
            "@type": "PropertyValue",
            name: "Frame size",
            value: product.frameSize,
          },
          ...specifications.map(([key, value]) => ({
            "@type": "PropertyValue",
            name: specLabels[key],
            value,
          })),
        ],
      },
      {
        "@type": "Review",
        "@id": `${productUrl}#review`,
        url: productUrl,
        name: `${product.name} review`,
        headline: `${product.name}: ${product.verdictLabel}`,
        description: product.editorVerdict,
        itemReviewed: {
          "@id": `${productUrl}#product`,
        },
        author: {
          "@type": "Organization",
          name: "Project Atlas",
          url: homeUrl,
        },
        publisher: {
          "@type": "Organization",
          name: "Project Atlas",
          url: homeUrl,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: product.editorialScore,
          bestRating: 10,
          worstRating: 1,
        },
        positiveNotes: {
          "@type": "ItemList",
          itemListElement: product.pros.map((pro, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: pro,
          })),
        },
        negativeNotes: {
          "@type": "ItemList",
          itemListElement: product.cons.map((con, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: con,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${productUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "AI Glasses",
            item: categoryUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: productUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(structuredData),
        }}
      />

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <Link
          href="/ai-glasses"
          className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/50 hover:bg-white/10 hover:text-white"
        >
          ← Back to AI Glasses
        </Link>

        <section className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-white/10 bg-slate-800/50 p-5 sm:p-8 lg:border-b-0 lg:border-r">
              <ProductImage
                src={product.image.src}
                alt={product.image.alt}
                priority
                aspectRatio="square"
                sizes="(max-width: 1023px) 100vw, 45vw"
                className="rounded-3xl border-white/10 bg-slate-950"
                imageClassName="p-8 sm:p-10"
              />
            </div>

            <div className="flex flex-col p-7 sm:p-10">
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-cyan-400 px-4 py-2 text-xs font-black uppercase tracking-wide text-slate-950">
                  {qualificationLabel}
                </span>

                <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-200">
                  {product.verdictLabel}
                </span>
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                {product.category} review
              </p>

              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                {product.name}
              </h1>

              <p className="mt-3 text-lg font-semibold text-slate-400">
                {product.brand}
              </p>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                {product.shortDescription}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
                    Atlas score
                  </p>

                  <div className="mt-2 flex items-end gap-1">
                    <span className="text-4xl font-black">
                      {product.editorialScore.toFixed(1)}
                    </span>

                    <span className="pb-1 text-sm text-slate-400">/10</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Customer rating
                  </p>

                  <p className="mt-2 text-3xl font-black">
                    ⭐ {product.customerRating.toFixed(1)}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Reviews
                  </p>

                  <p className="mt-2 text-3xl font-black">
                    {product.totalReviewCount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Fit
                  </p>

                  <p className="mt-2 text-lg font-bold text-white">
                    {product.fit}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Frame size
                  </p>

                  <p className="mt-2 text-lg font-bold text-white">
                    {product.frameSize}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm font-bold text-white">Best for</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {product.bestFor.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href="#editors-verdict"
                    className="rounded-full bg-cyan-400 px-6 py-3.5 text-center font-bold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Read our verdict
                  </a>

                  <Link
                    href="/compare"
                    className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-center font-bold text-white transition hover:border-cyan-400/50 hover:bg-white/10"
                  >
                    Compare products
                  </Link>

                  {affiliateLinks.map((link) => (
                    <a
                      key={`${link.retailer}-${link.url}`}
                      href={link.url}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-center font-bold text-white transition hover:border-cyan-400/50 hover:bg-white/10"
                    >
                      Check current price at {link.retailer}
                    </a>
                  ))}
                </div>

                {affiliateLinks.length > 0 && (
                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    Price and availability are provided by the retailer and may
                    change.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          id="editors-verdict"
          className="mt-12 scroll-mt-28 rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-7 sm:p-9"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Editor&apos;s verdict
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Our take on {product.name}
              </h2>

              <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">
                {product.editorVerdict}
              </p>
            </div>

            <div className="min-w-48 rounded-3xl border border-cyan-400/20 bg-slate-950 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-cyan-400">
                Atlas verdict
              </p>

              <div className="mt-4 flex items-end gap-2">
                <span className="text-6xl font-black">
                  {product.editorialScore.toFixed(1)}
                </span>

                <span className="pb-2 text-lg text-slate-400">/10</span>
              </div>

              <p className="mt-3 text-xl font-bold">{product.verdictLabel}</p>
            </div>
          </div>
        </section>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-slate-900 p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Review breakdown
            </p>

            <h2 className="mt-3 text-3xl font-bold">Atlas score details</h2>

            <div className="mt-7 space-y-5">
              {reviewScores.map(([key, score]) => (
                <div key={key}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold">{scoreLabels[key]}</p>

                    <p className="font-bold text-cyan-400">
                      {score.toFixed(1)}/10
                    </p>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full ${getScoreBarClass(score)}`}
                      style={{
                        width: `${Math.min(Math.max(score * 10, 0), 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900 p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Recommended for
            </p>

            <h2 className="mt-3 text-3xl font-bold">Best for</h2>

            <ul className="mt-7 space-y-4">
              {product.bestFor.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300"
                >
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-bold text-cyan-400"
                  >
                    ✓
                  </span>

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Product details
          </p>

          <h2 className="mt-3 text-3xl font-bold">Quick specifications</h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <p className="text-sm font-semibold text-cyan-400">Fit</p>

              <p className="mt-2 leading-7 text-slate-300">{product.fit}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <p className="text-sm font-semibold text-cyan-400">
                Frame size
              </p>

              <p className="mt-2 leading-7 text-slate-300">
                {product.frameSize}
              </p>
            </div>

            {specifications.map(([key, value]) => (
              <div
                key={key}
                className="rounded-2xl border border-white/10 bg-slate-900 p-5"
              >
                <p className="text-sm font-semibold text-cyan-400">
                  {specLabels[key]}
                </p>

                <p className="mt-2 leading-7 text-slate-300">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-7">
            <h2 className="text-2xl font-bold">Pros</h2>

            <ul className="mt-5 space-y-3 text-slate-300">
              {product.pros.map((pro) => (
                <li key={pro} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-bold text-emerald-400"
                  >
                    ✓
                  </span>

                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-rose-400/20 bg-rose-400/5 p-7">
            <h2 className="text-2xl font-bold">Cons</h2>

            <ul className="mt-5 space-y-3 text-slate-300">
              {product.cons.map((con) => (
                <li key={con} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-bold text-rose-400"
                  >
                    –
                  </span>

                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-7">
          <h2 className="text-2xl font-bold">Rating sources</h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-400">
            Customer ratings and review totals are recorded from the sources
            below on the listed date. They may change after publication.
          </p>

          <div className="mt-6 space-y-4">
            {product.sources.map((source) => (
              <div
                key={`${source.platform}-${source.checkedAt}`}
                className="flex flex-col justify-between gap-4 border-b border-white/10 pb-4 last:border-b-0 last:pb-0 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-semibold">{source.platform}</p>

                  <p className="text-sm text-slate-400">
                    Checked {source.checkedAt}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:items-end">
                  <p>
                    ⭐ {source.rating.toFixed(1)} ·{" "}
                    {source.reviewCount.toLocaleString()} reviews
                  </p>

                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
                  >
                    View rating source
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {affiliateLinks.length > 0 && (
          <section className="mt-12 rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-7">
            <h2 className="text-2xl font-bold">Where to buy</h2>

            <p className="mt-3 max-w-3xl leading-7 text-slate-300">
              Visit the retailer to see its current price, available options,
              shipping details, and stock status.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              {affiliateLinks.map((link) => (
                <a
                  key={`${link.retailer}-${link.url}`}
                  href={link.url}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Check current price at {link.retailer}
                </a>
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-400">
              Affiliate disclosure: Project Atlas may earn a commission from
              qualifying purchases made through these links, at no additional
              cost to you. Price and availability are provided by the retailer
              and may change.
            </p>
          </section>
        )}
      </section>
    </main>
  );
}