import type { Metadata } from "next";
import Image from "next/image";
import { Save } from "lucide-react";

export const metadata: Metadata = { title: "Profile" };

export default function AdminProfilePage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl text-charcoal-950">Profile</h1>
        <p className="text-sm text-ink-muted">Manage your admin account details.</p>
      </div>

      <div className="rounded-xl2 border border-charcoal-900/8 bg-cream-100 p-7 shadow-card">
        <div className="flex items-center gap-5">
          <Image
            src="/images/ceo-abdullah-baig.jpg"
            alt="Abdullah Baig"
            width={72}
            height={72}
            className="rounded-full object-cover object-top"
          />
          <div>
            <h2 className="font-display text-lg text-charcoal-950">Abdullah Baig</h2>
            <p className="text-sm text-ink-muted">CEO · Baig Tours Pakistan</p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="full-name" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Full Name</label>
            <input id="full-name" defaultValue="Abdullah Baig" className="mt-1.5 w-full rounded-lg border border-charcoal-900/15 bg-cream-100 px-4 py-3 text-sm focus:outline-none" />
          </div>
          <div>
            <label htmlFor="role" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Role</label>
            <input id="role" defaultValue="CEO / Administrator" disabled className="mt-1.5 w-full rounded-lg border border-charcoal-900/10 bg-cream-200 px-4 py-3 text-sm text-ink-muted" />
          </div>
          <div>
            <label htmlFor="profile-email" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Email</label>
            <input id="profile-email" defaultValue="info@baigtourspakistan.pk" className="mt-1.5 w-full rounded-lg border border-charcoal-900/15 bg-cream-100 px-4 py-3 text-sm focus:outline-none" />
          </div>
          <div>
            <label htmlFor="profile-phone" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Phone</label>
            <input id="profile-phone" defaultValue="03079222271" className="mt-1.5 w-full rounded-lg border border-charcoal-900/15 bg-cream-100 px-4 py-3 text-sm focus:outline-none" />
          </div>
        </div>

        <button className="mt-6 flex items-center gap-2 rounded-full bg-charcoal-950 px-6 py-3 text-sm font-semibold text-cream hover:bg-charcoal-700">
          <Save size={15} /> Save Changes
        </button>
      </div>
    </div>
  );
}
