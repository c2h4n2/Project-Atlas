import type { Metadata } from "next";
import BestCategoryPage from "@/components/BestCategoryPage";
export const metadata: Metadata = { title: "Best TVs", description: "Project Atlas rankings for top OLED and mini-LED TVs for movies, streaming, sports, and gaming." };
export default function BestTVsPage() { return <BestCategoryPage categoryId="tvs" />; }
