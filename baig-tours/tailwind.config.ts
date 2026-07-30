import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#111827",
          950: "#12171F",
          900: "#1F2937",
          800: "#2A3441",
          700: "#374151",
        },
        cream: {
          DEFAULT: "#FAF7F2",
          100: "#FFFFFF",
          200: "#FFFDF8",
          300: "#F5E8C7",
        },
        gold: {
          DEFAULT: "#D4A017",
          50: "#FEF9E7",
          400: "#F2C14E",
          500: "#D4A017",
          600: "#C99700",
          700: "#B45309",
        },
        amber: {
          DEFAULT: "#F59E0B",
        },
        emerald: {
          DEFAULT: "#22C55E",
        },
        ink: {
          DEFAULT: "#111827",
          muted: "#6B7280",
        },
        success: "#16A34A",
        danger: "#DC2626",
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
        sans: [
          "var(--font-body)",
          "-apple-system",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
        route: [
          "var(--font-route)",
          "Courier New",
          "monospace",
        ],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      backgroundImage: {
        "summit-gradient":
          "linear-gradient(180deg, rgba(18,23,31,0) 0%, rgba(18,23,31,0.55) 55%, rgba(18,23,31,0.92) 100%)",
        "gold-sheen":
          "linear-gradient(120deg, #D4A017 0%, #F2C14E 45%, #C99700 100%)",
      },
      boxShadow: {
        card: "0 8px 30px -12px rgba(18,23,31,0.18)",
        "card-hover": "0 20px 45px -15px rgba(18,23,31,0.25)",
        glass: "0 8px 32px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "ken-burns": "ken-burns 18s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1) translate(0,0)" },
          "100%": { transform: "scale(1.12) translate(-1%,-2%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
