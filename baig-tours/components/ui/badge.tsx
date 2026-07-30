import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "gold",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "gold" | "emerald" | "charcoal" | "cream";
}) {
  const tones: Record<string, string> = {
    gold: "bg-gold-500 text-charcoal-950",
    emerald: "bg-emerald text-white",
    charcoal: "bg-charcoal-900 text-cream",
    cream: "bg-cream/90 text-charcoal-900",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
