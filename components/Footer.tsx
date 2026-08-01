import Link from "next/link";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "AI Glasses", href: "/ai-glasses" },
      { label: "Best AI Glasses", href: "/best-ai-glasses" },
      { label: "Compare Products", href: "/compare" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Editorial Policy", href: "/editorial-policy" },
      { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 md:grid-cols-[1.4fr_2fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 font-black text-slate-950">
              A
            </span>

            <div>
              <p className="text-lg font-bold tracking-tight">Project Atlas</p>
              <p className="text-sm text-slate-400">
                Independent product research
              </p>
            </div>
          </Link>

          <p className="mt-5 max-w-md leading-7 text-slate-400">
            Clear reviews, comparisons, and rankings designed to help shoppers
            make more confident buying decisions.
          </p>

          <p className="mt-5 text-sm leading-6 text-slate-500">
            Project Atlas may earn commissions from qualifying purchases, but
            affiliate relationships do not determine our editorial rankings.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-300">
                {group.title}
              </h2>

              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-cyan-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Project Atlas. All rights reserved.
          </p>

          <p>Research before you buy.</p>
        </div>
      </div>
    </footer>
  );
}