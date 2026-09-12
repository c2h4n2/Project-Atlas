import { getBestCategoryMetadata } from "@/lib/bestCategoryMetadata";
import BestCategoryPage from "@/components/BestCategoryPage";

export const metadata = getBestCategoryMetadata("headphones-earbuds");

export default function BestPage() {
  return <BestCategoryPage categoryId="headphones-earbuds" />;
}
