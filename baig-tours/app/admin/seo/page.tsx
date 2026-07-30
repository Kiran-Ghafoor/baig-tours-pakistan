import type { Metadata } from "next";
import { Save, Globe } from "lucide-react";

export const metadata: Metadata = { title: "SEO Settings" };

export default function AdminSeoPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl text-charcoal-950">SEO Settings</h1>
        <p className="text-sm text-ink-muted">Control how Baig Tours appears in search results and social shares.</p>
      </div>

      <div className="space-y-6 rounded-xl2 border border-charcoal-900/8 bg-cream-100 p-7 shadow-card">
        <div className="flex items-center gap-2 text-sm font-semibold text-charcoal-950">
          <Globe size={16} className="text-gold-600" /> Global Meta Defaults
        </div>

        <div>
          <label htmlFor="site-title" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Default Page Title</label>
          <input id="site-title" defaultValue="Baig Tours Pakistan | Trips That Make Stories" className="mt-1.5 w-full rounded-lg border border-charcoal-900/15 bg-cream-100 px-4 py-3 text-sm focus:outline-none" />
        </div>

        <div>
          <label htmlFor="site-description" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Meta Description</label>
          <textarea id="site-description" rows={3} defaultValue="Pakistan's premium travel booking platform for Hunza, Skardu, Fairy Meadows, Swat, Naran, Lahore and K2 Base Camp." className="mt-1.5 w-full rounded-lg border border-charcoal-900/15 bg-cream-100 px-4 py-3 text-sm focus:outline-none" />
        </div>

        <div>
          <label htmlFor="site-keywords" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Focus Keywords</label>
          <input id="site-keywords" defaultValue="Pakistan tours, Hunza Valley tour, Skardu tour package, K2 base camp trek" className="mt-1.5 w-full rounded-lg border border-charcoal-900/15 bg-cream-100 px-4 py-3 text-sm focus:outline-none" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="og-title" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Open Graph Title</label>
            <input id="og-title" defaultValue="Baig Tours Pakistan" className="mt-1.5 w-full rounded-lg border border-charcoal-900/15 bg-cream-100 px-4 py-3 text-sm focus:outline-none" />
          </div>
          <div>
            <label htmlFor="canonical-url" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Canonical Domain</label>
            <input id="canonical-url" defaultValue="https://www.baigtourspakistan.pk" className="mt-1.5 w-full rounded-lg border border-charcoal-900/15 bg-cream-100 px-4 py-3 text-sm focus:outline-none" />
          </div>
        </div>

        <button className="flex items-center gap-2 rounded-full bg-charcoal-950 px-6 py-3 text-sm font-semibold text-cream hover:bg-charcoal-700">
          <Save size={15} /> Save Changes
        </button>
      </div>
    </div>
  );
}
