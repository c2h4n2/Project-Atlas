import fs from "node:fs";
import path from "node:path";
const file = path.resolve(process.cwd(), "data/products.ts");
let source = fs.readFileSync(file, "utf8");
const importLine = 'import { expansionTo125 } from "./products/expansion-to-125";';
const markerImport = 'import { expansionTo100 } from "./products/expansion-to-100";';
if (!source.includes(importLine)) { if (!source.includes(markerImport)) throw new Error("Apply 100-product milestone first."); source = source.replace(markerImport, `${markerImport}\n${importLine}`); }
if (!source.includes("...expansionTo125")) { const marker = "...expansionTo100,"; if (!source.includes(marker)) throw new Error("Could not find expansionTo100 spread."); source = source.replace(marker, `${marker}\n  ...expansionTo125,`); }
fs.writeFileSync(file, source, "utf8");
console.log("Applied 125-product expansion");
