import type { Metadata } from "next";
import CategoryLanding from "@/components/CategoryLanding";

export const metadata: Metadata = {
  title: "Webcams",
  description: "Browse Atlas-reviewed webcams and compare the strongest options.",
};

export default function Page() {
  return <CategoryLanding categoryId="webcams" />;
}
