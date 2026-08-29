import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://project-c2h4n3.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/affiliate-disclosure",
    "/all-products",
    "/compare",
    "/contact",
    "/editorial-policy",
    "/top-picks",
  ];

  const categoryRoutes = categories.flatMap((category) => [
    category.href,
    category.bestHref,
  ]);

  const productRoutes = products.map(
    (product) => `/products/${product.slug}`,
  );

  return [...staticRoutes, ...categoryRoutes, ...productRoutes].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path.startsWith("/products/")
      ? ("monthly" as const)
      : ("weekly" as const),
    priority:
      path === ""
        ? 1
        : path.startsWith("/products/")
          ? 0.8
          : path.startsWith("/best-")
            ? 0.9
            : 0.7,
  }));
}
