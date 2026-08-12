import { products } from "../data/products";
const slugs = new Set<string>(); const duplicates:string[]=[];
for (const p of products) { if (slugs.has(p.slug)) duplicates.push(p.slug); slugs.add(p.slug); }
console.log(`Products: ${products.length}`); console.log(`Unique slugs: ${slugs.size}`); console.log(`Duplicate slugs: ${duplicates.length}`);
if (duplicates.length) { console.error(duplicates); process.exit(1); }
if (products.length !== 125) { console.error(`Expected 125 products but found ${products.length}`); process.exit(1); }
