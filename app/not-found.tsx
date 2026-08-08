import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900 p-8 text-center sm:p-12">
          <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-cyan-400/10 text-7xl font-black text-cyan-400">
            404
          </div>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Page Not Found
          </p>

          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
            We couldn&apos;t find that page.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            The page may have been moved, deleted, or the URL may be incorrect.
            Return to the homepage or continue exploring smart tech products,
            reviews, rankings, and comparisons on Project C2H4N3.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="rounded-full bg-cyan-400 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Home
            </Link>

            <Link
              href="/all-products"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-bold transition hover:border-cyan-400/50 hover:bg-white/10"
            >
              Browse Products
            </Link>

            <Link
              href="/top-picks"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-bold transition hover:border-cyan-400/50 hover:bg-white/10"
            >
              Top Picks
            </Link>
          </div>

          <div className="mt-14 grid gap-4 text-left md:grid-cols-3">
            <Link
              href="/all-products"
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40 hover:bg-white/10"
            >
              <p className="text-sm font-semibold text-cyan-400">
                All Products
              </p>

              <p className="mt-2 text-slate-300">
                Browse smart tech products across all active categories.
              </p>
            </Link>

            <Link
              href="/top-picks"
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40 hover:bg-white/10"
            >
              <p className="text-sm font-semibold text-cyan-400">
                Top Picks
              </p>

              <p className="mt-2 text-slate-300">
                See the highest-rated products selected by Project C2H4N3.
              </p>
            </Link>

            <Link
              href="/compare"
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40 hover:bg-white/10"
            >
              <p className="text-sm font-semibold text-cyan-400">
                Compare Products
              </p>

              <p className="mt-2 text-slate-300">
                Compare features, scores, specifications, and buying options side by side.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}