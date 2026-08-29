import type { Metadata } from "next";
import CategoryLanding from "@/components/CategoryLanding";

export const metadata: Metadata = {
  title: "Keyboards",
  description: "Browse Atlas-reviewed keyboards and compare the strongest options.",
};

export default function Page() {
  return <CategoryLanding categoryId="keyboards" />;
}
