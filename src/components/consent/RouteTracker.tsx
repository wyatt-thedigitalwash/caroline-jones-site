"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "./injectScripts";

// The ad tags record the page they were loaded on. Next.js navigations don't
// reload the page, so each later route change is reported here. The first
// pathname is skipped: the tags' own bootstrap already counted it.
export default function RouteTracker() {
  const pathname = usePathname();
  const last = useRef(pathname);

  useEffect(() => {
    if (last.current === pathname) return;
    last.current = pathname;
    trackPageView();
  }, [pathname]);

  return null;
}
