import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Project C2H4N3",
    short_name: "Atlas",
    description: "Independent tech product research, rankings, comparisons, and buying guidance.",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
  };
}
