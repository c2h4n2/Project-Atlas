import fs from "node:fs";
import path from "node:path";

const file = path.resolve(process.cwd(), "components/ProductCard.tsx");
let source = fs.readFileSync(file, "utf8");

const importLine =
  'import { getLaptopUseCases } from "@/data/laptop-use-cases";';

if (!source.includes(importLine)) {
  const marker = 'import type { Product } from "@/data/products";';

  if (!source.includes(marker)) {
    throw new Error(
      'Could not find Product import marker in components/ProductCard.tsx',
    );
  }

  source = source.replace(marker, `${marker}\n${importLine}`);
}

const oldBlock = `{product.bestFor.slice(0, 2).map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-cyan-400">✓</span>
            <span>{item}</span>
          </li>
        ))}`;

const newBlock = `{(
          product.categoryId === "laptops"
            ? getLaptopUseCases(product.slug)
            : product.bestFor.slice(0, 2)
        ).map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-cyan-400">✓</span>
            <span>{item}</span>
          </li>
        ))}`;

if (!source.includes(newBlock)) {
  if (!source.includes(oldBlock)) {
    throw new Error(
      "Could not find the current Best for block in ProductCard.tsx. Paste ProductCard.tsx if this package cannot apply.",
    );
  }

  source = source.replace(oldBlock, newBlock);
}

fs.writeFileSync(file, source, "utf8");
console.log("Updated ProductCard laptop Best for tags.");
