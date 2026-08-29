import type { Metadata } from "next";
import BestCategoryPage from "@/components/BestCategoryPage";
export const metadata: Metadata = { title: "Best Cameras", description: "Project Atlas rankings for top mirrorless cameras for photos, video, travel, and creators." };
export default function BestCamerasPage() { return <BestCategoryPage categoryId="cameras" />; }
