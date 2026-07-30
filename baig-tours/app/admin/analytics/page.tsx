import type { Metadata } from "next";
import { Eye, MousePointerClick, TrendingUp, Users } from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { destinations } from "@/data/content";

export const metadata: Metadata = { title: "Analytics" };

const topPages = [
  { path: "/tours/hunza-valley-luxury-escape", views: 12480 },
  { path: "/", views: 9820 },
  { path: "/tours/skardu-adventure-expedition", views: 7310 },
  { path: "/destinations/hunza", views: 5640 },
  { path: "/tours", views: 4990 },
];

export default function AdminAnalyticsPage() {
  const maxViews = Math.max(...topPages.map((p) => p.views));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl text-charcoal-950">Analytics</h1>
        <p className="text-sm text-ink-muted">Website performance for the last 30 days</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Page Views" value="184,290" change="+22%" icon={Eye} />
        <StatCard label="Unique Visitors" value="42,610" change="+14%" icon={Users} />
        <StatCard label="Booking Conversions" value="3.8%" change="+0.6%" icon={MousePointerClick} />
        <StatCard label="Avg. Session Duration" value="4m 12s" change="+9%" icon={TrendingUp} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl2 border border-charcoal-900/8 bg-cream-100 p-6 shadow-card">
          <h2 className="font-display text-lg text-charcoal-950">Top Performing Pages</h2>
          <div className="mt-5 space-y-4">
            {topPages.map((p) => (
              <div key={p.path}>
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate font-medium text-charcoal-950">{p.path}</span>
                  <span className="text-ink-muted">{p.views.toLocaleString()}</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-cream-200">
                  <div
                    className="h-2 rounded-full bg-gold-500"
                    style={{ width: `${(p.views / maxViews) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl2 border border-charcoal-900/8 bg-cream-100 p-6 shadow-card">
          <h2 className="font-display text-lg text-charcoal-950">Traffic by Destination Interest</h2>
          <div className="mt-5 space-y-4">
            {destinations.slice(0, 5).map((d) => (
              <div key={d.id} className="flex items-center justify-between text-sm">
                <span className="font-medium text-charcoal-950">{d.name}</span>
                <span className="text-ink-muted">{d.tourCount * 340} searches</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
