import type { Metadata } from "next";
import Link from "next/link";
import {
  DollarSign,
  CalendarCheck,
  Users,
  Star,
  ArrowUpRight,
} from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { bookings, monthlyRevenue } from "@/data/admin";
import { reviews } from "@/data/content";
import { formatPKR, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

export default function AdminDashboardPage() {
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl text-charcoal-950">
          Welcome back, Abdullah 👋
        </h1>
        <p className="text-sm text-ink-muted">
          Here&apos;s what&apos;s happening across Baig Tours today.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Revenue (MTD)" value={formatPKR(6400000)} change="+18.2%" icon={DollarSign} />
        <StatCard label="Active Bookings" value="128" change="+6.4%" icon={CalendarCheck} />
        <StatCard label="Total Customers" value="4,920" change="+3.1%" icon={Users} />
        <StatCard label="Avg. Rating" value="4.8 / 5" change="+0.2" icon={Star} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl2 border border-charcoal-900/8 bg-cream-100 p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-charcoal-950">Revenue (Last 6 Months)</h2>
            <span className="text-xs text-ink-muted">In PKR millions</span>
          </div>
          <div className="mt-8 flex h-48 items-end gap-4">
            {monthlyRevenue.map((m) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-40 w-full items-end">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-gold-600 to-gold-400 transition-all"
                    style={{ height: `${(m.revenue / maxRevenue) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-ink-muted">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl2 border border-charcoal-900/8 bg-cream-100 p-6 shadow-card">
          <h2 className="font-display text-lg text-charcoal-950">Latest Reviews</h2>
          <div className="mt-5 space-y-4">
            {reviews.slice(0, 3).map((r) => (
              <div key={r.id} className="border-b border-charcoal-900/5 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-charcoal-950">{r.name}</span>
                  <span className="text-xs font-semibold text-gold-600">★ {r.rating}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{r.comment}</p>
              </div>
            ))}
          </div>
          <Link href="/admin/reviews" className="mt-4 flex items-center gap-1 text-xs font-semibold text-gold-600">
            View all reviews <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      <div className="rounded-xl2 border border-charcoal-900/8 bg-cream-100 shadow-card">
        <div className="flex items-center justify-between p-6">
          <h2 className="font-display text-lg text-charcoal-950">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-xs font-semibold text-gold-600">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-y border-charcoal-900/8 text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="px-6 py-3 font-medium">Booking ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Tour</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 5).map((b) => (
                <tr key={b.id} className="border-b border-charcoal-900/5 last:border-0">
                  <td className="px-6 py-3.5 font-medium text-charcoal-950">{b.id}</td>
                  <td className="px-6 py-3.5">{b.customer}</td>
                  <td className="px-6 py-3.5 text-ink-muted">{b.tourTitle}</td>
                  <td className="px-6 py-3.5 text-ink-muted">{formatDate(b.date)}</td>
                  <td className="px-6 py-3.5 font-medium text-charcoal-950">{formatPKR(b.amount)}</td>
                  <td className="px-6 py-3.5"><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
