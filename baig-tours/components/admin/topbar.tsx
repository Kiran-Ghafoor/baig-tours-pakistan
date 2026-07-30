import Image from "next/image";
import { Search, Bell, Menu } from "lucide-react";

export function AdminTopbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-charcoal-900/8 bg-cream-100 px-5 md:px-8">
      <div className="flex items-center gap-3">
        <button className="flex h-10 w-10 items-center justify-center rounded-lg text-charcoal-900 lg:hidden" aria-label="Open menu">
          <Menu size={20} />
        </button>
        <div className="hidden items-center gap-2 rounded-full border border-charcoal-900/10 px-4 py-2 sm:flex">
          <Search size={15} className="text-ink-muted" />
          <input
            placeholder="Search bookings, tours, customers..."
            className="w-64 bg-transparent text-sm focus:outline-none"
            aria-label="Search admin panel"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-charcoal-900 hover:bg-charcoal-900/5" aria-label="Notifications">
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
        </button>
        <div className="flex items-center gap-2.5">
          <Image
            src="/images/ceo-abdullah-baig.jpg"
            alt="Abdullah Baig"
            width={38}
            height={38}
            className="rounded-full object-cover object-top"
          />
          <div className="hidden text-sm sm:block">
            <div className="font-semibold text-charcoal-950">Abdullah Baig</div>
            <div className="text-xs text-ink-muted">Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}
