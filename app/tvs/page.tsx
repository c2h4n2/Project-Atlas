import type { Metadata } from "next";
import CategoryLanding from "@/components/CategoryLanding";
export const metadata: Metadata = { title: "TVs", description: "Compare Project Atlas TV reviews across OLED, mini-LED, gaming, and streaming-focused models." };
export default function TVsPage() { return <CategoryLanding categoryId="tvs" />; }
