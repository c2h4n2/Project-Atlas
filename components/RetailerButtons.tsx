"use client";

import { sortRetailerLinks } from "@/data/retailers";
import type { AffiliateLink } from "@/data/products";

type Props = { links: AffiliateLink[]; compact?: boolean; maxLinks?: number };

function isAmazonSearch(link: AffiliateLink) {
  return link.retailer.trim().toLowerCase() === "amazon" &&
    link.url.includes("amazon.com/s?");
}

export default function RetailerButtons({ links, compact = false, maxLinks }: Props) {
  const sorted = sortRetailerLinks(links);
  const visible = typeof maxLinks === "number" ? sorted.slice(0, maxLinks) : sorted;
  if (visible.length === 0) return null;

  return (
    <div>
      <div className={compact ? "flex flex-col gap-2" : "flex flex-col gap-3 sm:flex-row sm:flex-wrap"}>
        {visible.map((link, index) => {
          const primary = index === 0;
          const label = isAmazonSearch(link)
            ? "Search Amazon"
            : primary ? `Check price at ${link.retailer}` : `Also at ${link.retailer}`;

          return (
            <a
              key={`${link.retailer}-${link.url}`}
              href={link.url}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className={
                compact
                  ? primary
                    ? "rounded-full bg-amber-400 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-amber-300"
                    : "rounded-full border border-white/20 bg-white/5 px-5 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-400/50 hover:bg-white/10"
                  : primary
                    ? "rounded-full bg-amber-400 px-6 py-3.5 text-center font-black text-slate-950 transition hover:bg-amber-300"
                    : "rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-center font-bold text-white transition hover:border-cyan-400/50 hover:bg-white/10"
              }
            >
              {label}
            </a>
          );
        })}
      </div>

      <p className={compact ? "mt-2 text-center text-[11px] leading-4 text-slate-500" : "mt-3 text-xs leading-5 text-slate-500"}>
        {compact
          ? "Affiliate links may earn Atlas a commission at no extra cost to you."
          : "Retailer availability and pricing can change. Project C2H4N3 may earn a commission from qualifying purchases at no additional cost to you."}
      </p>
    </div>
  );
}
