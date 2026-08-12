export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <article className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
          About Project C2H4N3
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          Helping people buy better products.
        </h1>

        <div className="mt-10 space-y-8 leading-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-bold text-white">Our mission</h2>

            <p className="mt-3">
              Project C2H4N3 helps consumers make informed buying decisions by
              combining customer ratings, product research, comparisons, and
              editorial analysis into clear, easy-to-understand reviews.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Why Project C2H4N3 exists
            </h2>

            <p className="mt-3">
              Shopping online can be overwhelming. Thousands of products often
              look similar, while reviews, specifications, and marketing claims
              can be difficult to evaluate. Project C2H4N3 aims to simplify that
              process through transparent research and consistent evaluation
              standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              What you&apos;ll find here
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Product reviews</li>
              <li>Side-by-side comparisons</li>
              <li>Best product rankings</li>
              <li>Buying guides</li>
              <li>Editorial research</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Looking ahead
            </h2>

            <p className="mt-3">
              We are launching with AI glasses and plan to expand into additional
              technology and consumer product categories over time while keeping
              the same research methodology across the site.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}