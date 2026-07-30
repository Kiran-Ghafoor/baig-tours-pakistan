"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroSlide, HeroButton } from "@/types";

const SLIDE_INTERVAL = 5000;

export function Hero({
  eyebrow,
  heading,
  subheading,
  slides,
  buttons,
}: {
  eyebrow: string;
  heading: string;
  subheading: string;
  slides: HeroSlide[];
  buttons: HeroButton[];
}) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const id = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-center overflow-hidden bg-[#1a150d]">
      {/* Background image carousel */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            className={`animate-ken-burns object-cover transition-opacity duration-[1800ms] ease-in-out ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a150d] via-[#1a150d]/35 to-[#1a150d]/55" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4A017]/[0.06] via-transparent to-[#F2C14E]/[0.04]" />
      </div>

      <div className="container-app relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow text-gold-400"
        >
          <span className="h-px w-8 bg-gold-400" /> {eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 max-w-3xl font-display text-4xl leading-[1.08] text-cream sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {heading.split("\n").length > 1 ? (
            heading.split("\n").map((line, i) => (
              <span key={i} className={i === 1 ? "block text-gold-400" : ""}>
                {line}
              </span>
            ))
          ) : (
            <>
              {heading.split("the stories")[0]}
              <span className="block text-gold-400">the stories{heading.split("the stories")[1]}</span>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-lg text-base leading-relaxed text-cream/75 md:text-lg"
        >
          {subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          {buttons.map((btn) => (
            <Button
              key={btn.label}
              href={btn.url || undefined}
              variant={btn.variant === "outline-light" ? "outline-light" : undefined}
              size="lg"
              className={btn.variant === "outline-light" ? "group" : undefined}
            >
              {btn.variant === "outline-light" && (
                <PlayCircle size={20} className="text-gold-400" />
              )}
              {btn.label}
            </Button>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/60"
        aria-hidden="true"
      >
        <ChevronDown size={26} />
      </motion.div>
    </section>
  );
}
