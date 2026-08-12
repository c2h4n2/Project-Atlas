import fs from "node:fs";
import path from "node:path";

const file = path.resolve(process.cwd(), "components/ProductCard.tsx");
let source = fs.readFileSync(file, "utf8");

const productImport = 'import type { Product } from "@/data/products";';

if (!source.includes('import CustomerRating from "@/components/CustomerRating";')) {
  source = source.replace(
    productImport,
    `${productImport}
import CustomerRating from "@/components/CustomerRating";
import EditorialScore from "@/components/EditorialScore";`,
  );
}

source = source.replace(/Atlas score/g, "C2H4N3 score");
source = source.replace(/Customers/g, "Customer rating");

source = source.replace(
  /<p className="mt-2 text-4xl font-black">\s*\{product\.editorialScore\.toFixed\(1\)\}\s*<\/p>/,
  `<div className="mt-2">
          <EditorialScore score={product.editorialScore} />
        </div>`,
);

source = source.replace(
  /<p className="mt-2 text-2xl font-black">\s*\{product\.totalReviewCount > 0\s*\?\s*`⭐ \$\{product\.customerRating\.toFixed\(1\)\}`\s*:\s*"New"\}\s*<\/p>/,
  `<div className="mt-2">
          <CustomerRating
            rating={product.customerRating}
            reviewCount={product.totalReviewCount}
          />
        </div>`,
);

fs.writeFileSync(file, source, "utf8");
console.log("Updated ProductCard rating display.");
