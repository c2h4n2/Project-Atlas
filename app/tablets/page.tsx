import type { Metadata } from "next";
import CategoryLanding from "@/components/CategoryLanding";
export const metadata: Metadata = { title: "Tablets", description: "Compare Project Atlas tablet reviews across Apple, Samsung, OnePlus, Lenovo, and more." };
export default function TabletsPage() { return <CategoryLanding categoryId="tablets" />; }
