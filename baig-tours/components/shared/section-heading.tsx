import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <span className="eyebrow">
        <span className="h-px w-6 bg-gold-500" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2
        className={cn(
          "mt-4 font-display text-3xl leading-tight tracking-tight md:text-[2.75rem]",
          light ? "text-cream" : "text-charcoal-950"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            light ? "text-cream/70" : "text-ink-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
