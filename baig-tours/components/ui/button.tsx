import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none",
  {
    variants: {
      variant: {
        primary:
          "bg-gold-500 text-charcoal-950 hover:bg-gold-600 hover:-translate-y-0.5 shadow-md hover:shadow-lg",
        dark: "bg-charcoal-900 text-cream hover:bg-charcoal-700 hover:-translate-y-0.5",
        outline:
          "border border-charcoal-900/15 text-charcoal-900 hover:border-gold-500 hover:text-gold-600 bg-transparent",
        ghost: "text-charcoal-900 hover:bg-charcoal-900/5",
        "outline-light":
          "border border-cream/40 text-cream hover:bg-cream/10 hover:border-cream",
        link: "text-gold-600 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

export function Button({
  className,
  variant,
  size,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {props.children as React.ReactNode}
      </Link>
    );
  }
  return <button className={classes} {...props} />;
}
