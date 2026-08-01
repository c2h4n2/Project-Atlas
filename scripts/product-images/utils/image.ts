import sharp from "sharp";

export async function saveImageAsWebp(
  inputBuffer: Buffer,
  outputFilePath: string,
): Promise<void> {
  await sharp(inputBuffer)
    .rotate()
    .resize({
      width: 1600,
      height: 1200,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: 88,
      effort: 5,
    })
    .toFile(outputFilePath);
}