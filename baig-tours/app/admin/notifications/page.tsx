import type { Metadata } from "next";
import { CalendarCheck, Star, MessageSquare, AlertTriangle } from "lucide-react";

export const metadata: Metadata = { title: "Notifications" };

const notifications = [
  { id: "n1", icon: CalendarCheck, tone: "text-emerald bg-emerald/10", title: "New booking confirmed", detail: "Ayesha Raza booked Hunza Valley Luxury Escape for 2 travelers.", time: "12 minutes ago" },
  { id: "n2", icon: Star, tone: "text-gold-600 bg-gold-50", title: "New 5-star review", detail: "Hamza Sheikh left a review for K2 Base Camp & Concordia Trek.", time: "1 hour ago" },
  { id: "n3", icon: MessageSquare, tone: "text-charcoal-900 bg-charcoal-900/10", title: "New contact form submission", detail: "A traveler asked about custom Swat family itineraries.", time: "3 hours ago" },
  { id: "n4", icon: AlertTriangle, tone: "text-danger bg-danger/10", title: "Booking cancelled", detail: "Usman Tariq cancelled Naran, Kaghan & Saif-ul-Malook Tour.", time: "Yesterday" },
];

export default function AdminNotificationsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl text-charcoal-950">Notifications</h1>
        <p className="text-sm text-ink-muted">Recent activity across bookings, reviews and messages.</p>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className="flex items-start gap-4 rounded-xl2 border border-charcoal-900/8 bg-cream-100 p-5 shadow-card">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${n.tone}`}>
              <n.icon size={17} />
            </span>
            <div>
              <p className="text-sm font-semibold text-charcoal-950">{n.title}</p>
              <p className="mt-0.5 text-sm text-ink-muted">{n.detail}</p>
              <span className="mt-1 block text-xs text-ink-muted">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
