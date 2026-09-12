import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AtlasAnalyticsEvent from "@/components/AtlasAnalyticsEvent";
import AtlasTrackedLink from "@/components/AtlasTrackedLink";
import ProductImage from "@/components/ProductImage";
import RetailerButtons from "@/components/RetailerButtons";
import { getCategory } from "@/data/categories";
import { products, type Product } from "@/data/products";
import { getSeoComparison, seoComparisons } from "@/data/seo-comparisons";

type Props = { params: Promise<{ comparison: string }> };

const baseUrl = () => process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://project-c2h4n3.vercel.app";

function findPair(slug: string) {
  const comparison = getSeoComparison(slug);
  if (!comparison) return null;
  const [aSlug, bSlug] = comparison.productSlugs;
  const a = products.find((p) => p.slug === aSlug);
  const b = products.find((p) => p.slug === bSlug);
  return a && b ? { a, b } : null;
}

function label(p: Product) {
  return p.categoryId ? getCategory(p.categoryId)?.label ?? p.category : p.category;
}

export function generateStaticParams() {
  return seoComparisons.map(({ slug }) => ({ comparison: slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { comparison } = await params;
  const pair = findPair(comparison);
  if (!pair) return {};
  const { a, b } = pair;
  const title = `${a.name} vs ${b.name}: Which Is Better?`;
  const description = `Compare ${a.name} vs ${b.name} across C2H4N3 scores, specifications, strengths, trade-offs, and buying recommendations.`;
  const canonical = `/compare/${comparison}`;
  return { title, description, alternates: { canonical }, openGraph: { type: "website", url: canonical, title, description }, twitter: { card: "summary_large_image", title, description } };
}

export default async function SeoComparisonPage({ params }: Props) {
  const { comparison } = await params;
  const pair = findPair(comparison);
  if (!pair) notFound();
  const { a, b } = pair;
  if (label(a).trim().toLowerCase() !== label(b).trim().toLowerCase()) notFound();

  const category = getCategory(a.categoryId ?? "") ?? getCategory(b.categoryId ?? "");
  const [winner, runnerUp] = [a, b].sort((x, y) => y.editorialScore - x.editorialScore || x.name.localeCompare(y.name));
  const scoreKeys = [...new Set([...Object.keys(a.reviewScores), ...Object.keys(b.reviewScores)])].slice(0, 8);
  const specKeys = [...new Set([...Object.keys(a.specs), ...Object.keys(b.specs)])].slice(0, 10);
  const pageUrl = `${baseUrl()}/compare/${comparison}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "ItemList", name: `${a.name} vs ${b.name}`, url: pageUrl, numberOfItems: 2, itemListElement: [
        { "@type": "ListItem", position: 1, name: a.name, url: `${baseUrl()}/products/${a.slug}` },
        { "@type": "ListItem", position: 2, name: b.name, url: `${baseUrl()}/products/${b.slug}` },
      ]},
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl() },
        { "@type": "ListItem", position: 2, name: "Compare", item: `${baseUrl()}/compare` },
        { "@type": "ListItem", position: 3, name: `${a.name} vs ${b.name}`, item: pageUrl },
      ]},
    ],
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <AtlasAnalyticsEvent eventName="seo_comparison_view" params={{ comparison_slug: comparison, product_1_slug: a.slug, product_2_slug: b.slug, category_id: a.categoryId ?? b.categoryId ?? "" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <Link href={category?.href ?? "/all-products"} className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-200">← Back</Link>
          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">Product comparison</p>
          <h1 className="mt-4 max-w-5xl text-4xl font-black tracking-tight sm:text-6xl">{a.name} vs {b.name}</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">Compare scores, specifications, strengths, weaknesses, and buying guidance to decide which product fits your priorities better.</p>
          {category && <div className="mt-8 flex flex-wrap gap-3">
            <AtlasTrackedLink href={category.bestHref} eventName="ranking_click" eventParams={{ category_id: category.id, category_name: category.label, source_surface: "seo_comparison_header" }} className="rounded-full border border-cyan-400/30 bg-cyan-400/5 px-5 py-3 text-sm font-bold text-cyan-300">View full ranking</AtlasTrackedLink>
            <AtlasTrackedLink href={category.compareHref} eventName="compare_click" eventParams={{ action: "open_comparison_tool", category_id: category.id, source_surface: "seo_comparison_header" }} className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold">Open comparison tool</AtlasTrackedLink>
          </div>}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <section className="rounded-[2rem] border border-cyan-400/25 bg-cyan-400/5 p-7 sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            C2H4N3 verdict
          </p>

          <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Which should you buy?
              </h2>

              <p className="mt-4 text-lg leading-8 text-slate-200">
                <span className="font-bold text-white">
                  {winner.name}
                </span>{" "}
                is our overall pick in this matchup with a C2H4N3 score of{" "}
                <span className="font-bold text-cyan-300">
                  {winner.editorialScore.toFixed(1)}/10
                </span>{" "}
                versus {runnerUp.editorialScore.toFixed(1)}/10 for{" "}
                {runnerUp.name}.
              </p>

              <p className="mt-3 leading-7 text-slate-400">
                The score is not the whole decision. Choose based on your
                priorities, budget, and the trade-offs below.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-cyan-400/25 bg-slate-950/70 px-6 py-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">
                Overall pick
              </p>

              <p className="mt-2 text-5xl font-black text-cyan-300">
                {winner.editorialScore.toFixed(1)}
                <span className="text-lg text-slate-400"> / 10</span>
              </p>

              <p className="mt-2 max-w-[220px] font-bold text-white">
                {winner.name}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-cyan-400/20 bg-slate-950/60 p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">
                Choose {winner.name} if
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                {winner.bestFor[0] ?? winner.pros[0] ?? winner.editorVerdict}
              </p>

              {winner.pros[0] && (
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  <span className="font-semibold text-white">
                    Key advantage:
                  </span>{" "}
                  {winner.pros[0]}
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-300">
                Choose {runnerUp.name} if
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                {runnerUp.bestFor[0] ?? runnerUp.pros[0] ?? runnerUp.editorVerdict}
              </p>

              {runnerUp.pros[0] && (
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  <span className="font-semibold text-white">
                    Key advantage:
                  </span>{" "}
                  {runnerUp.pros[0]}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-slate-950/60 p-5">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">
                  Ready to buy our pick?
                </p>

                <p className="mt-2 font-bold text-white">
                  Check current retailer availability for {winner.name}
                </p>
              </div>

              <div className="min-w-0 lg:w-[320px]">
                <RetailerButtons
                  links={winner.affiliateLinks}
                  productSlug={winner.slug}
                  productName={winner.name}
                  sourceSurface="seo_comparison_verdict"
                  compact
                  maxLinks={2}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {[a, b].map((product) => <article key={product.id} className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
            <ProductImage src={product.image.src} slug={product.slug} alt={product.image.alt} aspectRatio="card" className="rounded-none border-0 border-b border-white/10" />
            <div className="p-6">
              <p className="text-sm font-semibold text-cyan-400">{product.brand}</p><h2 className="mt-2 text-2xl font-bold">{product.name}</h2>
              <p className="mt-4 leading-7 text-slate-300">{product.shortDescription}</p>
              <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4"><p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">C2H4N3 score</p><p className="mt-2 text-4xl font-black">{product.editorialScore.toFixed(1)}<span className="text-sm text-slate-400"> / 10</span></p></div>
              <div className="mt-5"><RetailerButtons links={product.affiliateLinks} productSlug={product.slug} productName={product.name} sourceSurface="seo_comparison" /></div>
              <AtlasTrackedLink href={`/products/${product.slug}`} eventName="review_click" eventParams={{ product_slug: product.slug, product_name: product.name, category_id: product.categoryId ?? "", source_surface: "seo_comparison" }} className="mt-5 block rounded-full border border-white/20 px-5 py-3 text-center font-bold">Read full review</AtlasTrackedLink>
            </div>
          </article>)}
        </div>

        {scoreKeys.length > 0 && <section className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
          <div className="border-b border-white/10 p-6"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Score comparison</p><h2 className="mt-3 text-3xl font-bold">How the scores compare</h2></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[700px]"><thead><tr className="border-b border-white/10 text-left"><th className="p-4 text-sm text-slate-400">Category</th><th className="p-4">{a.name}</th><th className="p-4">{b.name}</th></tr></thead><tbody>{scoreKeys.map((key) => <tr key={key} className="border-b border-white/10 last:border-0"><td className="p-4 font-semibold text-slate-300">{category?.scoreLabels[key] ?? key.replace(/([A-Z])/g, " $1")}</td><td className="p-4 font-bold text-cyan-300">{a.reviewScores[key]?.toFixed(1) ?? "—"}</td><td className="p-4 font-bold text-cyan-300">{b.reviewScores[key]?.toFixed(1) ?? "—"}</td></tr>)}</tbody></table></div>
        </section>}

        {specKeys.length > 0 && <section className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
          <div className="border-b border-white/10 p-6"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Specifications</p><h2 className="mt-3 text-3xl font-bold">Specs side by side</h2></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[700px]"><thead><tr className="border-b border-white/10 text-left"><th className="p-4 text-sm text-slate-400">Specification</th><th className="p-4">{a.name}</th><th className="p-4">{b.name}</th></tr></thead><tbody>{specKeys.map((key) => <tr key={key} className="border-b border-white/10 last:border-0"><td className="p-4 font-semibold capitalize text-slate-300">{key.replace(/([A-Z])/g, " $1")}</td><td className="p-4 text-slate-300">{a.specs[key] ?? "—"}</td><td className="p-4 text-slate-300">{b.specs[key] ?? "—"}</td></tr>)}</tbody></table></div>
        </section>}

        <section className="mt-12 grid gap-6 lg:grid-cols-2">{[a, b].map((product) => <article key={product.id} className="rounded-3xl border border-white/10 bg-white/5 p-7"><h2 className="text-2xl font-bold">Why choose {product.name}?</h2><p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">Strengths</p><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">{product.pros.slice(0, 3).map((x) => <li key={x}>✓ {x}</li>)}</ul><p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-rose-300">Trade-offs</p><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">{product.cons.slice(0, 3).map((x) => <li key={x}>– {x}</li>)}</ul>{product.bestFor[0] && <p className="mt-6 rounded-2xl border border-white/10 bg-slate-900 p-4 text-sm leading-6 text-slate-300"><span className="font-bold text-white">Best for:</span> {product.bestFor[0]}</p>}</article>)}</section>

        {category && <section className="mt-12 rounded-[2rem] border border-white/10 bg-white/5 p-7 sm:p-9"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">More options</p><h2 className="mt-3 text-3xl font-bold">Still deciding?</h2><p className="mt-4 max-w-3xl leading-7 text-slate-300">See where both products rank against the rest of the category, or open the interactive comparison tool to build your own shortlist.</p><div className="mt-6 flex flex-wrap gap-3"><AtlasTrackedLink href={category.bestHref} eventName="ranking_click" eventParams={{ category_id: category.id, category_name: category.label, source_surface: "seo_comparison_footer" }} className="rounded-full bg-cyan-400 px-6 py-3 font-bold text-slate-950">View full ranking</AtlasTrackedLink><AtlasTrackedLink href={category.compareHref} eventName="compare_click" eventParams={{ action: "open_comparison_tool", category_id: category.id, source_surface: "seo_comparison_footer" }} className="rounded-full border border-white/20 px-6 py-3 font-bold">Compare more products</AtlasTrackedLink></div></section>}
      </section>
    </main>
  );
}
