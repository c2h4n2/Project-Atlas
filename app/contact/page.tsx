import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold">
            Project Atlas
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
          >
            Back Home
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Contact
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          We&apos;d love to hear from you.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Whether you&apos;ve found an error, have a product suggestion, or want
          to provide feedback, we&apos;d appreciate hearing from you.
        </p>

        <div className="mt-12 rounded-3xl border border-white/10 bg-slate-900 p-8">
          <h2 className="text-2xl font-bold">Contact information</h2>

          <p className="mt-6 text-slate-300">
            A dedicated contact email will be added before the public launch of
            Project Atlas.
          </p>

          <p className="mt-4 text-slate-400">
            Until then, this page serves as a placeholder for Version 1.0.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-8">
          <h2 className="text-2xl font-bold">
            What you can contact us about
          </h2>

          <ul className="mt-6 list-disc space-y-3 pl-6 text-slate-300">
            <li>Product corrections</li>
            <li>Broken links</li>
            <li>Feature requests</li>
            <li>Product recommendations</li>
            <li>Business inquiries</li>
            <li>General feedback</li>
          </ul>
        </div>
      </article>
    </main>
  );
}