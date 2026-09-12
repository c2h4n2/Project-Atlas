"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { trackAtlasEvent } from "@/lib/analytics";

type AnalyticsValue =
  | string
  | number
  | boolean
  | undefined
  | null;

type Props = {
  href: string;
  eventName: string;
  eventParams?: Record<string, AnalyticsValue>;
  className?: string;
  children: ReactNode;
};

export default function AtlasTrackedLink({
  href,
  eventName,
  eventParams = {},
  className,
  children,
}: Props) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        trackAtlasEvent(eventName, {
          ...eventParams,
          destination: href,
        });
      }}
    >
      {children}
    </Link>
  );
}
