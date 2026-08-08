import type { AffiliateLink } from "./products";

export type RetailerConfig = {
  id: string;
  label: string;
  priority: number;
};

export const retailerConfigs: RetailerConfig[] = [
  { id: "amazon", label: "Amazon", priority: 10 },
  { id: "walmart", label: "Walmart", priority: 20 },
  { id: "target", label: "Target", priority: 30 },
  { id: "costco", label: "Costco", priority: 40 },
  { id: "best buy", label: "Best Buy", priority: 50 },
  { id: "manufacturer", label: "Manufacturer", priority: 90 },
];

function normalizeRetailerName(name: string) {
  return name.trim().toLowerCase();
}

export function getRetailerPriority(retailer: string) {
  const normalized = normalizeRetailerName(retailer);

  return (
    retailerConfigs.find((config) => config.id === normalized)?.priority ?? 70
  );
}

export function sortRetailerLinks(links: AffiliateLink[]) {
  return [...links]
    .filter((link) => link.url.trim() !== "")
    .sort((a, b) => {
      const priorityDifference =
        getRetailerPriority(a.retailer) - getRetailerPriority(b.retailer);

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      return a.retailer.localeCompare(b.retailer);
    });
}
