"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/components/providers/site-settings-provider";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Destinations", href: "/destinations" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blogs", href: "/blogs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { contact, logoUrl } = useSiteSettings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !isHome || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "bg-charcoal-950/95 shadow-[0_2px_24px_rgba(0,0,0,0.35)] backdrop-blur-md"
          : "bg-charcoal-950/30 backdrop-blur-sm"
      )}
    >
      <div className="container-app flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={`${contact.phone ? "Baig Tours" : "Baig Tours"} logo`}
              width={44}
              height={44}
              className="rounded-full object-cover ring-2 ring-gold-500/20"
              priority
            />
          ) : (
            <Image
              src="/logo/baig-tours-logo.jpg"
              alt="Pakistan Baig Tours logo"
              width={44}
              height={44}
              className="rounded-full object-cover ring-2 ring-gold-500/20"
              priority
            />
          )}
          <span className="font-display text-lg leading-none tracking-tight text-cream">
            BAIG TOURS
            <span className="block text-[10px] font-sans font-semibold uppercase tracking-widest2 text-gold-400">
              PAKISTAN
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-sm font-medium text-cream/80 transition-colors duration-200 hover:text-cream after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-gold-400 after:transition-all after:duration-300 hover:after:w-full",
                pathname === link.href && "text-cream after:w-full"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:+${contact.phone}`}
            className="flex items-center gap-2 text-sm font-medium text-cream/80 transition-colors hover:text-cream"
          >
            <Phone size={16} className="text-gold-400" />
            {contact.phone}
          </a>
          <Button href="/booking" size="md">
            Book a Tour
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-cream/80 transition-colors hover:text-cream lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-cream/10 bg-charcoal-950/98 px-5 pb-6 pt-2 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-cream/5 py-3 text-sm font-medium text-cream/80 transition-colors hover:text-cream"
              >
                {link.label}
                <ChevronDown size={16} className="-rotate-90 text-cream/40" />
              </Link>
            ))}
          </nav>
          <Button href="/booking" className="mt-4 w-full">
            Book a Tour
          </Button>
        </div>
      )}
    </header>
  );
}
