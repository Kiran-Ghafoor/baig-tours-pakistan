"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-charcoal-950 px-6 text-center">
      <div className="relative z-10">
        <h1 className="font-display text-7xl text-cream md:text-8xl">Oops!</h1>
        <p className="mx-auto mt-4 max-w-md text-cream/70">
          Something went wrong on our end. Our team has been notified.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button onClick={reset}>Try Again</Button>
          <Button href="/" variant="outline-light">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
