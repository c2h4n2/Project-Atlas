import type { Metadata } from "next";
import CategoryLanding from "@/components/CategoryLanding";

export const metadata: Metadata = {
  title: "Mice",
  description: "Browse Atlas-reviewed mice and compare the strongest options.",
};

export default function Page() {
  return <CategoryLanding categoryId="mice" />;
}
