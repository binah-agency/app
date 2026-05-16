import { useRouter } from "@tanstack/react-router";

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export function trackEvent(event: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

export const Analytics = {
  whatsappClicked(location: string) {
    trackEvent("whatsapp_clicked", { location });
  },

  socialLinkClicked(network: string, location: string) {
    trackEvent("social_link_clicked", { network, location });
  },

  navigationClicked(label: string) {
    trackEvent("navigation_clicked", { label });
  },

  categoryClicked(name: string) {
    trackEvent("category_clicked", { category_name: name });
  },

  ctaClicked(ctaText: string, location: string) {
    trackEvent("cta_clicked", { cta_text: ctaText, location });
  },

  pageViewed(title: string, path: string) {
    trackEvent("page_viewed", { page_title: title, page_path: path });
  },
};

export function usePageTracking() {
  const router = useRouter();
  const pathname = router.state.location.pathname;

  if (typeof window !== "undefined") {
    Analytics.pageViewed(document.title, pathname);
  }
}
