import { readFile, writeFile } from "node:fs/promises";

import type { ImagePathUpdate } from "../types";

export async function updateProductImagePaths(
  productsFilePath: string,
  updates: ImagePathUpdate[],
): Promise<number> {
  let sourceText = await readFile(productsFilePath, "utf8");
  let updateCount = 0;

  for (const update of updates) {
    if (update.currentPath === update.nextPath) {
      continue;
    }

    const currentCode = `src: "${update.currentPath}"`;
    const nextCode = `src: "${update.nextPath}"`;

    if (!sourceText.includes(currentCode)) {
      console.warn(
        `Could not update missing image path: ${update.currentPath}`,
      );
      continue;
    }

    sourceText = sourceText.replace(currentCode, nextCode);
    updateCount += 1;
  }

  if (updateCount > 0) {
    await writeFile(productsFilePath, sourceText, "utf8");
  }

  return updateCount;
}