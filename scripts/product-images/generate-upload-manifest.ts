import { writeFile } from "node:fs/promises";
import path from "node:path";

import { products } from "../../data/products";

function csv(value: string | number) {
  const text = String(value).replaceAll('"', '""');
  return `"${text}"`;
}

async function main() {
  const outputPath = path.join(process.cwd(), "product-images-upload.csv");
  const header = [
    "category",
    "brand",
    "product_name",
    "slug",
    "upload_filename",
  ];

  const lines = [
    header.map(csv).join(","),
    ...products
      .slice()
      .sort((a, b) =>
        `${a.category}-${a.name}`.localeCompare(`${b.category}-${b.name}`),
      )
      .map((product) =>
        [
          product.category,
          product.brand,
          product.name,
          product.slug,
          `${product.slug}.jpg`,
        ]
          .map(csv)
          .join(","),
      ),
  ];

  await writeFile(outputPath, `${lines.join("\n")}\n`, "utf8");
  console.log(`Created ${outputPath}`);
  console.log(`Products listed: ${products.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
