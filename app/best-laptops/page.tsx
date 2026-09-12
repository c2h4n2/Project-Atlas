import { getBestCategoryMetadata } from "@/lib/bestCategoryMetadata";
import BestCategoryPage from "@/components/BestCategoryPage";

export const metadata = getBestCategoryMetadata("laptops");

export default function BestPage() {
  return <BestCategoryPage categoryId="laptops" />;
}
