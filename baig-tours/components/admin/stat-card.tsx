import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  change,
  trend = "up",
  icon: Icon,
}: {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-xl2 border border-charcoal-900/8 bg-cream-100 p-6 shadow-card">
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-50 text-gold-600">
          <Icon size={19} />
        </span>
        {change && (
          <span
            className={cn(
              "flex items-center gap-1 text-xs font-semibold",
              trend === "up" ? "text-success" : "text-danger"
            )}
          >
            {trend === "up" ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {change}
          </span>
        )}
      </div>
      <div className="mt-4 font-display text-2xl text-charcoal-950">{value}</div>
      <div className="text-xs text-ink-muted">{label}</div>
    </div>
  );
}
