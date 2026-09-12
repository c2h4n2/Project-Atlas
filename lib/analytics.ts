"use client";

type AnalyticsValue = string | number | boolean | undefined | null;

type AnalyticsParams = Record<string, AnalyticsValue>;

type AnalyticsWindow = Window & {
  gtag?: (
    command: "event",
    eventName: string,
    params?: Record<string, AnalyticsValue>,
  ) => void;
};

export function trackAtlasEvent(
  eventName: string,
  params: AnalyticsParams = {},
) {
  if (typeof window === "undefined") return;

  const analyticsWindow = window as AnalyticsWindow;

  analyticsWindow.gtag?.("event", eventName, {
    ...params,
    page_path: window.location.pathname,
    page_location: window.location.href,
    referrer: document.referrer || undefined,
  });
}
