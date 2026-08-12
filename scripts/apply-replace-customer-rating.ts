import fs from "node:fs";
import path from "node:path";

const cardFile = path.resolve(process.cwd(), "components/ProductCard.tsx");
let card = fs.readFileSync(cardFile, "utf8");

card = card.replace(
  'import CustomerRating from "@/components/CustomerRating";\n',
  "",
);
card = card.replace(
  'import TrustMeter from "@/components/TrustMeter";\n',
  "",
);

const productImport = 'import type { Product } from "@/data/products";';
const verdictImport =
  'import ProductVerdict from "@/components/ProductVerdict";';

if (!card.includes(verdictImport)) {
  card = card.replace(productImport, `${productImport}\n${verdictImport}`);
}

const customerBlock =
  /<div className="rounded-2xl border border-white\/10 bg-slate-800 p-4">[\s\S]*?<p className="text-\[10px\][\s\S]*?>\s*Customer rating\s*<\/p>[\s\S]*?<CustomerRating product=\{product\} \/>[\s\S]*?<\/div>\s*<\/div>/m;

card = card.replace(
  customerBlock,
  `<div className="rounded-2xl border border-white/10 bg-slate-800 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              C2H4N3 verdict
            </p>

            <div className="mt-2">
              <ProductVerdict product={product} />
            </div>
          </div>`,
);

card = card.replace(
  /\s*<div className="mt-4">\s*<TrustMeter product=\{product\} \/>\s*<\/div>\s*/m,
  "\n",
);

fs.writeFileSync(cardFile, card, "utf8");
console.log("Replaced Customer Rating and Trust Meter with C2H4N3 Verdict.");

const pageFile = path.resolve(process.cwd(), "app/products/[slug]/page.tsx");

if (fs.existsSync(pageFile)) {
  let page = fs.readFileSync(pageFile, "utf8");

  page = page.replace(
    'import CustomerRatingBreakdown from "@/components/CustomerRatingBreakdown";\n',
    "",
  );

  page = page.replace(
    /\s*<div className="mx-auto max-w-6xl px-6 pb-16">\s*<CustomerRatingBreakdown product=\{product\} \/>\s*<\/div>\s*/m,
    "\n",
  );

  fs.writeFileSync(pageFile, page, "utf8");
  console.log("Removed customer rating breakdown from product pages.");
}
