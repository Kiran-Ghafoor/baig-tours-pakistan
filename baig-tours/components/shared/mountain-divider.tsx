import { cn } from "@/lib/utils";

/**
 * The brand's signature device: a triple-peak silhouette lifted from the
 * Baig Tours mark, used as a seam between sections instead of a plain line.
 */
export function MountainDivider({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      className={cn(
        "mountain-divider pointer-events-none w-full leading-[0] text-cream",
        flip && "rotate-180",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-16 w-full md:h-24"
      >
        <path d="M0 120 L0 70 L160 20 L260 70 L360 5 L480 70 L620 40 L760 90 L880 30 L1000 75 L1140 15 L1260 65 L1440 40 L1440 120 Z" />
      </svg>
    </div>
  );
}
