import { Compass } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <Compass size={40} className="animate-pulse text-gold-500" />
      <p className="mt-4 font-display text-lg text-charcoal-950/60">
        Loading...
      </p>
    </div>
  );
}
