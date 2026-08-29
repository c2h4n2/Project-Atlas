import type { Metadata } from "next";
import BestCategoryPage from "@/components/BestCategoryPage";

export const metadata: Metadata = {
  title: "Best Webcams",
  description: "See the highest-rated Atlas picks in this category.",
};

export default function Page() {
  return <BestCategoryPage categoryId="webcams" />;
}
