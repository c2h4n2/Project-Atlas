import type { Metadata } from "next";
import CategoryLanding from "@/components/CategoryLanding";
export const metadata: Metadata = { title: "SSDs", description: "Browse Atlas-reviewed ssds and compare the strongest options." };
export default function Page() { return <CategoryLanding categoryId="ssds" />; }
