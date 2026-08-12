import { products } from "../data/products";

const laptopCount = products.filter((p) => p.categoryId === "laptops").length;
const monitorCount = products.filter((p) => p.categoryId === "monitors").length;
const slugs = new Set(products.map((p) => p.slug));

console.log(`Products: ${products.length}`);
console.log(`Laptops: ${laptopCount}`);
console.log(`Monitors: ${monitorCount}`);
console.log(`Unique slugs: ${slugs.size}`);

if (laptopCount !== 15) throw new Error(`Expected 15 laptops, found ${laptopCount}`);
if (monitorCount !== 15) throw new Error(`Expected 15 monitors, found ${monitorCount}`);
if (slugs.size !== products.length) throw new Error("Duplicate slugs found");
