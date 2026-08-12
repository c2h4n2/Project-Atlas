import fs from "node:fs";
import path from "node:path";
import type { StepResult } from "./utils";

export type ProductSyncReport = {
  startedAt: string;
  finishedAt: string;
  mode: "write" | "dry-run";
  steps: StepResult[];
  success: boolean;
};

export function writeProductSyncReport(report: ProductSyncReport) {
  const dir = path.resolve(process.cwd(), "customer-ratings");
  fs.mkdirSync(dir, { recursive: true });

  const file = path.join(dir, "product-sync-report.json");

  fs.writeFileSync(
    file,
    JSON.stringify(report, null, 2),
    "utf8",
  );

  console.log(`\nReport: ${path.relative(process.cwd(), file)}`);
}
