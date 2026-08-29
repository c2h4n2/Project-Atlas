import type { Metadata } from "next";
import BestCategoryPage from "@/components/BestCategoryPage";
export const metadata: Metadata = { title: "Best Tablets", description: "Project Atlas rankings for the best tablets for work, school, creative use, and entertainment." };
export default function BestTabletsPage() { return <BestCategoryPage categoryId="tablets" />; }
