import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "All Products", href: "/all-products" },
      { label: "Top Picks", href: "/top-picks" },
      { label: "Compare Products", href: "/compare" },
      { label: "AI Glasses", href: "/ai-glasses" },
      { label: "Headphones & Earbuds", href: "/headphones-earbuds" },
      { label: "Smartwatches", href: "/smartwatches" },
      { label: "Laptops", href: "/laptops" },
      { label: "Monitors", href: "/monitors" },
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
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/brand/c2h4n3-header-v2.webp"
              alt="Project C2H4N3"
              width={2048}
              height={768}
              className="h-16 w-auto object-contain"
            />

            <div>
              <p className="text-xl font-bold tracking-tight text-white">
                Project C2H4N3
              </p>

              <p className="text-sm text-slate-400">
                Smart tech products search
              </p>
            </div>
          </Link>

          <p className="mt-6 max-w-md leading-7 text-slate-400">
            Independent reviews, comparisons, ratings, and buying guides
            designed to help shoppers make smarter technology purchasing
            decisions.
          </p>

          <p className="mt-6 text-sm leading-6 text-slate-500">
            Project C2H4N3 may earn commissions from qualifying purchases,
            but affiliate relationships never influence our editorial ratings
            or recommendations.
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
            © {new Date().getFullYear()} Project C2H4N3. All rights reserved.
          </p>

          <p>Research smarter. Buy better.</p>
        </div>
      </div>
    </footer>
  );
}