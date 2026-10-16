// Kept apart from techLogos.ts so Client Components can use these without
// bundling the whole icon set: they get just the logos they show as props.
export type Logo = { path: string; hex: string };

// Light brand colours (JavaScript yellow, etc.) need a dark badge to stay visible.
export function isLight(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b > 170;
}
