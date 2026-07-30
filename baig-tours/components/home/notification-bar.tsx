"use client";

import { useState, useEffect } from "react";
import { X, Megaphone, Info, CheckCircle, AlertTriangle, PartyPopper } from "lucide-react";
import Link from "next/link";
import type { SiteNotification } from "@/types";

const VARIANT_STYLES: Record<
  SiteNotification["variant"],
  { bg: string; text: string; icon: typeof Megaphone; link: string }
> = {
  promo: {
    bg: "bg-gold-500",
    text: "text-charcoal-950",
    icon: Megaphone,
    link: "bg-charcoal-950 text-cream hover:bg-charcoal-900",
  },
  info: {
    bg: "bg-charcoal-900",
    text: "text-cream",
    icon: Info,
    link: "bg-cream text-charcoal-900 hover:bg-cream-200",
  },
  success: {
    bg: "bg-emerald",
    text: "text-white",
    icon: CheckCircle,
    link: "bg-white text-emerald hover:bg-cream-200",
  },
  warning: {
    bg: "bg-gold-50",
    text: "text-charcoal-950",
    icon: AlertTriangle,
    link: "bg-charcoal-900 text-cream hover:bg-charcoal-900",
  },
  announcement: {
    bg: "bg-charcoal-950",
    text: "text-cream",
    icon: PartyPopper,
    link: "bg-gold-500 text-charcoal-950 hover:bg-gold-400",
  },
};

function getDismissKey(id: string) {
  return `dismissed-notification-${id}`;
}

export function NotificationBar({ notifications }: { notifications: SiteNotification[] }) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<SiteNotification | null>(null);

  useEffect(() => {
    const first = notifications.find((n) => {
      try { return !localStorage.getItem(getDismissKey(n.id)); } catch { return true; }
    });
    if (first) {
      setActive(first);
      setVisible(true);
    }
  }, [notifications.length]);

  if (!visible || !active) return null;

  const styles = VARIANT_STYLES[active.variant] ?? VARIANT_STYLES.promo;
  const Icon = styles.icon;

  function dismiss() {
    try {
      localStorage.setItem(getDismissKey(active!.id), "1");
    } catch {}
    setVisible(false);
  }

  return (
    <div className={`${styles.bg} ${styles.text} relative z-50`}>
      <div className="container-app flex items-center justify-between gap-4 py-2.5">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Icon size={16} className="shrink-0 opacity-80" />
          <p className="text-sm font-medium truncate">{active.message}</p>
          {active.link && active.linkText && (
            <Link
              href={active.link}
              className={`ml-2 shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 hover:-translate-y-px ${styles.link}`}
            >
              {active.linkText}
            </Link>
          )}
        </div>
        <button
          onClick={dismiss}
          className="shrink-0 rounded-full p-1.5 opacity-60 transition-opacity hover:opacity-100"
          aria-label="Dismiss notification"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
