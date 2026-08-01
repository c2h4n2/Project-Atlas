import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-20">
        <div className="w-full rounded-[2rem] border border-white/10 bg-slate-900 p-10 text-center shadow-2xl">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cyan-400/10">
            <span className="text-5xl font-black text-cyan-400">404</span>
          </div>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Page Not Found
          </p>

          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
            We couldn&apos;t find that page.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            The page may have been moved, deleted, or the URL may be incorrect.
            You can return to the homepage or continue exploring our AI glasses
            reviews and comparisons.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="rounded-full bg-cyan-400 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Home
            </Link>

            <Link
              href="/ai-glasses"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-bold transition hover:border-cyan-400/50 hover:bg-white/10"
            >
              Browse AI Glasses
            </Link>

            <Link
              href="/compare"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-bold transition hover:border-cyan-400/50 hover:bg-white/10"
            >
              Compare Products
            </Link>
          </div>

          <div className="mt-14 grid gap-4 text-left md:grid-cols-3">
            <Link
              href="/best-ai-glasses"
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40 hover:bg-white/10"
            >
              <p className="text-sm font-semibold text-cyan-400">
                Best AI Glasses
              </p>

              <p className="mt-2 text-slate-300">
                See our highest-rated AI glasses recommendations.
              </p>
            </Link>

            <Link
              href="/ai-glasses"
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40 hover:bg-white/10"
            >
              <p className="text-sm font-semibold text-cyan-400">
                Product Reviews
              </p>

              <p className="mt-2 text-slate-300">
                Read detailed reviews of every AI glasses model.
              </p>
            </Link>

            <Link
              href="/compare"
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40 hover:bg-white/10"
            >
              <p className="text-sm font-semibold text-cyan-400">
                Compare Models
              </p>

              <p className="mt-2 text-slate-300">
                Compare features, scores, fit, and specifications side by side.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}