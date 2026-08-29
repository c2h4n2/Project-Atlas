import type { Metadata } from "next";
import CategoryLanding from "@/components/CategoryLanding";
export const metadata: Metadata = { title: "Printers", description: "Browse Atlas-reviewed printers and compare the strongest options." };
export default function Page() { return <CategoryLanding categoryId="printers" />; }
