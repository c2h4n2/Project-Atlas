import Link from "next/link";

const explore = [
  { label: "All products", href: "/all-products" },
  { label: "Top picks", href: "/top-picks" },
  { label: "Compare", href: "/compare" },
];

const trust = [
  { label: "Editorial policy", href: "/editorial-policy" },
  { label: "Affiliate disclosure", href: "/affiliate-disclosure" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-xl">
          <Link href="/" className="text-lg font-black tracking-tight text-white">
            Project C2H4N3
          </Link>
          <p className="mt-4 text-sm leading-6">
            Independent tech research that separates editorial judgment, customer signals,
            specifications, and retailer availability so buyers can make clearer comparisons.
          </p>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            Atlas may earn a commission from qualifying purchases through retailer links at no
            additional cost to you. Affiliate relationships do not determine editorial scores.
          </p>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Explore</p>
          <nav className="mt-4 flex flex-col gap-3 text-sm">
            {explore.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">{item.label}</Link>
            ))}
          </nav>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Trust & transparency</p>
          <nav className="mt-4 flex flex-col gap-3 text-sm">
            {trust.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">{item.label}</Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Project C2H4N3. Product names and trademarks belong to their respective owners.
      </div>
    </footer>
  );
}
