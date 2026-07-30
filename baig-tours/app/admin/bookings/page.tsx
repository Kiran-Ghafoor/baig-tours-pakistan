import type { Metadata } from "next";
import { Download, Filter } from "lucide-react";
import { bookings } from "@/data/admin";
import { StatusBadge } from "@/components/admin/status-badge";
import { formatPKR, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Bookings" };

export default function AdminBookingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-charcoal-950">Bookings</h1>
          <p className="text-sm text-ink-muted">{bookings.length} total bookings this quarter</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-full border border-charcoal-900/15 px-4 py-2 text-sm font-medium text-charcoal-900 hover:border-gold-500">
            <Filter size={15} /> Filter
          </button>
          <button className="flex items-center gap-2 rounded-full bg-charcoal-950 px-4 py-2 text-sm font-medium text-cream hover:bg-charcoal-700">
            <Download size={15} /> Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl2 border border-charcoal-900/8 bg-cream-100 shadow-card">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-charcoal-900/8 text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-6 py-4 font-medium">Booking ID</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Tour</th>
              <th className="px-6 py-4 font-medium">Travel Date</th>
              <th className="px-6 py-4 font-medium">Travelers</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-charcoal-900/5 last:border-0 hover:bg-cream-200/50">
                <td className="px-6 py-4 font-medium text-charcoal-950">{b.id}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-charcoal-950">{b.customer}</div>
                  <div className="text-xs text-ink-muted">{b.email}</div>
                </td>
                <td className="px-6 py-4 text-ink-muted">{b.tourTitle}</td>
                <td className="px-6 py-4 text-ink-muted">{formatDate(b.date)}</td>
                <td className="px-6 py-4 text-ink-muted">{b.travelers}</td>
                <td className="px-6 py-4 font-medium text-charcoal-950">{formatPKR(b.amount)}</td>
                <td className="px-6 py-4"><StatusBadge status={b.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
