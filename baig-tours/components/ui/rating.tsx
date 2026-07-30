import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={
              i < Math.round(value)
                ? "fill-gold-500 text-gold-500"
                : "fill-transparent text-charcoal-900/20"
            }
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-ink">
        {value.toFixed(1)}
        {count !== undefined && (
          <span className="ml-1 font-normal text-ink-muted">({count})</span>
        )}
      </span>
      <span className="sr-only">{value} out of 5 stars</span>
    </div>
  );
}
