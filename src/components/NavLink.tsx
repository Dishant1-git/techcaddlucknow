"use client";

import type { ComponentProps, MouseEvent } from "react";
import Link from "next/link";

/**
 * Drop-in replacement for <a>. Links to other pages go through next/link, so
 * the browser swaps the page without a full reload; external, phone and mail
 * links stay ordinary anchors.
 *
 * A link to a section of the page you are already on ("/#courses" on the home
 * page) is not a navigation at all: Lenis (see Motion.tsx) sees the click and
 * scrolls there smoothly, so the router is kept out of it.
 */
export function NavLink({ href, onClick, ...props }: ComponentProps<"a"> & { href: string }) {
  if (!href.startsWith("/")) return <a href={href} onClick={onClick} {...props} />;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    const url = new URL(href, window.location.href);
    const newTab = e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || props.target === "_blank";
    if (e.defaultPrevented || newTab || !url.hash || url.pathname !== window.location.pathname) {
      return;
    }
    e.preventDefault();
    window.history.pushState(null, "", url);
    // Without Lenis (reduced motion) nothing else moves the page.
    if (!document.documentElement.classList.contains("lenis")) {
      document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView();
    }
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
