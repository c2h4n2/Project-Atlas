import type { Metadata } from "next";
import CategoryLanding from "@/components/CategoryLanding";
export const metadata: Metadata = { title: "Wi-Fi Routers", description: "Browse Atlas-reviewed wi-fi routers and compare the strongest options." };
export default function Page() { return <CategoryLanding categoryId="routers" />; }
