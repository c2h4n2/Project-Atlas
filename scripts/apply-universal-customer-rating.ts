import fs from "node:fs";
import path from "node:path";

const file = path.resolve(process.cwd(), "components/ProductCard.tsx");
let source = fs.readFileSync(file, "utf8");

const importLine =
  'import CustomerRating from "@/components/CustomerRating";';

if (!source.includes(importLine)) {
  const marker = 'import type { Product } from "@/data/products";';

  if (!source.includes(marker)) {
    throw new Error(
      "Could not find Product import in components/ProductCard.tsx",
    );
  }

  source = source.replace(marker, `${marker}\n${importLine}`);
}

source = source.replace(/>\s*Customers\s*</g, ">Customer rating<");
source = source.replace(/>\s*Customer Rating\s*</g, ">Customer rating<");

const universalBlock = `<div className="rounded-2xl border border-white/10 bg-slate-800 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Customer rating
            </p>

            <div className="mt-2">
              <CustomerRating product={product} />
            </div>
          </div>`;

const existingUniversal =
  /<div className="rounded-2xl border border-white\/10 bg-slate-800 p-4">[\s\S]*?<p className="text-\[10px\][\s\S]*?>\s*Customer rating\s*<\/p>[\s\S]*?<CustomerRating product=\{product\} \/>[\s\S]*?<\/div>\s*<\/div>/m;

if (!existingUniversal.test(source)) {
  const legacyCustomerBlock =
    /<div className="rounded-2xl border border-white\/10 bg-slate-800 p-4">[\s\S]*?<p className="text-\[10px\][\s\S]*?>\s*(?:Customers|Customer rating)\s*<\/p>[\s\S]*?<\/div>/m;

  if (legacyCustomerBlock.test(source)) {
    source = source.replace(legacyCustomerBlock, universalBlock);
  } else {
    throw new Error(
      "Could not find the customer rating card block in ProductCard.tsx.",
    );
  }
}

fs.writeFileSync(file, source, "utf8");

console.log("Customer rating is now enforced on every ProductCard.");
console.log("All categories using ProductCard will show the rating panel.");
