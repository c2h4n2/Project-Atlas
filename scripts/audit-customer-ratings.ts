import { products } from "../data/products";
import { customerRatingsBySlug } from "../data/customer-ratings";

let ratedProducts = 0;
let sourceCount = 0;
const errors: string[] = [];

for (const product of products) {
  const sources = customerRatingsBySlug[product.slug] ?? [];

  if (sources.length === 0) continue;

  ratedProducts += 1;
  sourceCount += sources.length;

  for (const source of sources) {
    if (source.rating <= 0 || source.rating > 5) {
      errors.push(`${product.slug}: invalid rating ${source.rating}`);
    }

    if (!Number.isInteger(source.reviewCount) || source.reviewCount <= 0) {
      errors.push(
        `${product.slug}: invalid review count ${source.reviewCount}`,
      );
    }
  }
}

for (const slug of Object.keys(customerRatingsBySlug)) {
  if (!products.some((product) => product.slug === slug)) {
    errors.push(`Unknown product slug in customer rating data: ${slug}`);
  }
}

console.log(`Products in catalog: ${products.length}`);
console.log(`Products with customer rating data: ${ratedProducts}`);
console.log(`Rating sources: ${sourceCount}`);
console.log(`Validation errors: ${errors.length}`);

for (const error of errors) {
  console.error(`- ${error}`);
}

if (errors.length > 0) process.exit(1);
