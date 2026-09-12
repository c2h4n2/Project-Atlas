"use client";

import { useEffect, useRef } from "react";
import { trackAtlasEvent } from "@/lib/analytics";

type Props = {
  eventName: string;
  params?: Record<
    string,
    string | number | boolean | undefined | null
  >;
};

export default function AtlasAnalyticsEvent({
  eventName,
  params = {},
}: Props) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;

    fired.current = true;
    trackAtlasEvent(eventName, params);
  }, [eventName, params]);

  return null;
}
