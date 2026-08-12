import fs from "node:fs";
import path from "node:path";

const file = path.resolve(process.cwd(), "components/ProductCard.tsx");
let source = fs.readFileSync(file, "utf8");

const marker = 'import type { Product } from "@/data/products";';
const trustImport = 'import TrustMeter from "@/components/TrustMeter";';

if (!source.includes(trustImport)) {
  source = source.replace(marker, `${marker}\n${trustImport}`);
}

if (!source.includes("<TrustMeter product={product} />")) {
  const bestFor = `        <div className="mt-6">
          <p className="text-sm font-bold">Best for</p>`;

  source = source.replace(
    bestFor,
    `        <div className="mt-4">
          <TrustMeter product={product} />
        </div>

${bestFor}`,
  );
}

fs.writeFileSync(file, source, "utf8");
console.log("Added C2H4N3 Trust Meter to all product cards.");
