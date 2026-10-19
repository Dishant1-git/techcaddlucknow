import { Star } from "lucide-react";

/** Five stars with the first `rating` filled — the same on reviews, testimonials and course pages. */
export function StarRating({ rating, className = "size-4" }: { rating: number; className?: string }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span role="img" aria-label={`${filled} out of 5 stars`} data-rating={filled} className="flex gap-0.5 text-sun">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden className={`${className} ${i < filled ? "fill-current" : "text-slate-200"}`} />
      ))}
    </span>
  );
}
