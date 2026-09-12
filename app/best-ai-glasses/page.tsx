import { getBestCategoryMetadata } from "@/lib/bestCategoryMetadata";
import BestCategoryPage from "@/components/BestCategoryPage";

export const metadata = getBestCategoryMetadata("ai-glasses");

export default function BestAIGlassesPage() {
  return <BestCategoryPage categoryId="ai-glasses" />;
}
