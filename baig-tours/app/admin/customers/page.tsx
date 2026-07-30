import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { customers } from "@/data/admin";
import { StatusBadge } from "@/components/admin/status-badge";
import { formatPKR } from "@/lib/utils";

export const metadata: Metadata = { title: "Customers" };

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-charcoal-950">Customers</h1>
        <p className="text-sm text-ink-muted">{customers.length} customers on file</p>
      </div>

      <div className="overflow-x-auto rounded-xl2 border border-charcoal-900/8 bg-cream-100 shadow-card">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="border-b border-charcoal-900/8 text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Contact</th>
              <th className="px-6 py-4 font-medium">Bookings</th>
              <th className="px-6 py-4 font-medium">Total Spend</th>
              <th className="px-6 py-4 font-medium">Joined</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-charcoal-900/5 last:border-0 hover:bg-cream-200/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Image src={c.avatar} alt={c.name} width={36} height={36} className="rounded-full object-cover" />
                    <div>
                      <div className="font-medium text-charcoal-950">{c.name}</div>
                      <div className="text-xs text-ink-muted">{c.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-ink-muted">
                  <div className="flex items-center gap-1.5"><Mail size={12} /> {c.email}</div>
                  <div className="mt-1 flex items-center gap-1.5"><Phone size={12} /> {c.phone}</div>
                </td>
                <td className="px-6 py-4 text-ink-muted">{c.totalBookings}</td>
                <td className="px-6 py-4 font-medium text-charcoal-950">{formatPKR(c.totalSpend)}</td>
                <td className="px-6 py-4 text-ink-muted">{c.joined}</td>
                <td className="px-6 py-4"><StatusBadge status={c.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
