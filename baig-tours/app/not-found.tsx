import Link from "next/link";
import Image from "next/image";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-charcoal-950 px-6 text-center">
      <Image
        src="https://picsum.photos/seed/404-mountains/1920/1080"
        alt=""
        fill
        className="object-cover opacity-30"
      />
      <div className="relative z-10">
        <span className="eyebrow justify-center text-gold-400">
          <Compass size={16} /> Off the marked trail
        </span>
        <h1 className="mt-4 font-display text-7xl text-cream md:text-8xl">404</h1>
        <p className="mx-auto mt-4 max-w-md text-cream/70">
          This path doesn&apos;t lead anywhere we&apos;ve mapped yet. Let&apos;s
          get you back to a route we know well.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" size="lg">Back to Home</Button>
          <Button href="/tours" variant="outline-light" size="lg">Browse Tours</Button>
        </div>
        <Link href="/" className="mt-8 inline-flex items-center gap-2">
          <Image
            src="/logo/baig-tours-logo.jpg"
            alt="Baig Tours Pakistan logo"
            width={36}
            height={36}
            className="rounded-full"
          />
        </Link>
      </div>
    </div>
  );
}
