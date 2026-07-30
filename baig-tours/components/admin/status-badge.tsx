import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  confirmed: "bg-emerald/10 text-emerald",
  completed: "bg-charcoal-900/10 text-charcoal-900",
  pending: "bg-gold-50 text-gold-700",
  cancelled: "bg-danger/10 text-danger",
  active: "bg-emerald/10 text-emerald",
  inactive: "bg-charcoal-900/10 text-ink-muted",
  published: "bg-emerald/10 text-emerald",
  draft: "bg-gold-50 text-gold-700",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize",
        styles[status] ?? "bg-charcoal-900/10 text-ink-muted"
      )}
    >
      {status}
    </span>
  );
}
