"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageProps = {
  src?: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  aspectRatio?: "square" | "card" | "wide";
};

const aspectRatioClasses = {
  square: "aspect-square",
  card: "aspect-[4/3]",
  wide: "aspect-video",
};

export default function ProductImage({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 400px",
  className = "",
  imageClassName = "",
  aspectRatio = "square",
}: ProductImageProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const normalizedSrc = src?.trim() ?? "";
  const hasImage = normalizedSrc.length > 0 && !imageFailed;

  return (
    <div
      className={`relative overflow-hidden border border-white/10 bg-slate-800 ${
        aspectRatioClasses[aspectRatio]
      } ${className}`}
    >
      {hasImage ? (
        <Image
          src={normalizedSrc}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setImageFailed(true)}
          className={`object-contain p-5 transition duration-300 group-hover:scale-105 ${imageClassName}`}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400 text-xl font-black text-slate-950 shadow-lg shadow-cyan-400/10">
            A
          </div>

          <p className="mt-4 text-sm font-bold text-white">Project Atlas</p>

          <p className="mt-1 text-xs text-slate-400">
            Product image coming soon
          </p>

          <p className="mt-4 max-w-[16rem] rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-semibold uppercase leading-4 tracking-[0.12em] text-slate-400">
            {alt}
          </p>
        </div>
      )}
    </div>
  );
}