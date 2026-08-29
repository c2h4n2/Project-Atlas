import type { Metadata } from "next";
import CategoryLanding from "@/components/CategoryLanding";
export const metadata: Metadata = { title: "Cameras", description: "Compare Project Atlas mirrorless camera reviews for photography, video, travel, and creator workflows." };
export default function CamerasPage() { return <CategoryLanding categoryId="cameras" />; }
