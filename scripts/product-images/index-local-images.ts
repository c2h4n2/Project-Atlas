import { writeLocalProductImageIndex } from "./utils/local-index";

async function main() {
  const result = await writeLocalProductImageIndex(process.cwd());
  console.log(`Indexed ${result.count} local product images.`);
  console.log(result.outputPath);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
