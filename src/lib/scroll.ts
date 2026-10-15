// The smooth-scroll instance created in Motion.tsx, so other components can
// scroll the page through it. It is null when reduced motion turns Lenis off.
import type Lenis from "lenis";

let current: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  current = lenis;
};

export function scrollToTop() {
  if (current) current.scrollTo(0);
  else window.scrollTo({ top: 0 });
}
