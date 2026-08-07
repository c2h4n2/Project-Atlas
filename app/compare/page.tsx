import { Suspense } from "react";
import CompareClient from "./CompareClient";

function CompareLoading() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
          <div
            aria-hidden="true"
            className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-cyan-400"
          />

          <p className="mt-5 font-semibold text-slate-300">
            Loading comparison…
          </p>
        </div>
      </section>
    </main>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<CompareLoading />}>
      <CompareClient />
    </Suspense>
  );
}
