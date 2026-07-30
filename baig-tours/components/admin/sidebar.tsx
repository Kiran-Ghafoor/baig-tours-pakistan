"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Map,
  Users,
  Star,
  Newspaper,
  Images,
  Search,
  BarChart3,
  UserCircle,
  Bell,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/tours", label: "Tours", icon: Map },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/seo", label: "SEO Settings", icon: Search },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/profile", label: "Profile", icon: UserCircle },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-charcoal-900/8 bg-charcoal-950 lg:flex">
      <Link href="/admin" className="flex items-center gap-3 px-6 py-6">
        <Image
          src="/logo/baig-tours-logo.jpg"
          alt="Baig Tours logo"
          width={38}
          height={38}
          className="rounded-full object-cover"
        />
        <div>
          <div className="font-display text-base text-cream">Baig Tours</div>
          <div className="text-[10px] uppercase tracking-widest2 text-gold-500">Admin Panel</div>
        </div>
      </Link>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-gold-500 text-charcoal-950"
                  : "text-cream/70 hover:bg-cream/5 hover:text-cream"
              )}
            >
              <link.icon size={17} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-cream/10 p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-cream/60 hover:bg-cream/5 hover:text-cream"
        >
          <LogOut size={17} /> Back to Website
        </Link>
      </div>
    </aside>
  );
}
