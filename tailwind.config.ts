import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          success: {
            DEFAULT: "hsl(var(--success))",
            foreground: "hsl(var(--success-foreground))",
          },
          warning: {
            DEFAULT: "hsl(var(--warning))",
            foreground: "hsl(var(--warning-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
          reading: "hsl(var(--reading))",
          writing: "hsl(var(--writing))",
          speaking: "hsl(var(--speaking))",
          listening: "hsl(var(--listening))",
          sidebar: {
            DEFAULT: "hsl(var(--sidebar-background))",
            foreground: "hsl(var(--sidebar-foreground))",
            primary: "hsl(var(--sidebar-primary))",
            "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
            accent: "hsl(var(--sidebar-accent))",
            "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
            border: "hsl(var(--sidebar-border))",
            ring: "hsl(var(--sidebar-ring))",
          },
        },
        backgroundImage: {
          'gradient-primary': 'linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))',
          'gradient-primary-hover': 'linear-gradient(135deg, hsl(var(--gradient-end)), hsl(var(--gradient-start)))',
          'gradient-hero': 'linear-gradient(135deg, hsl(222 47% 11% / 0.95), hsl(222 47% 15% / 0.9))',
        },
        boxShadow: {
          'card': '0 2px 8px -2px hsl(var(--foreground) / 0.08), 0 4px 16px -4px hsl(var(--foreground) / 0.04)',
          'card-hover': '0 8px 24px -4px hsl(var(--foreground) / 0.12), 0 12px 32px -8px hsl(var(--foreground) / 0.08)',
          'glow': '0 0 20px hsl(var(--primary) / 0.3)',
        },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
          "float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-10px)" },
          },
          "pulse-soft": {
            "0%, 100%": { opacity: "1" },
            "50%": { opacity: "0.7" },
          },
          "slide-up": {
            "0%": { opacity: "0", transform: "translateY(20px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
          },
          "slide-in-left": {
            "0%": { opacity: "0", transform: "translateX(-20px)" },
            "100%": { opacity: "1", transform: "translateX(0)" },
          },
          "scale-bounce": {
            "0%": { transform: "scale(0.95)" },
            "50%": { transform: "scale(1.02)" },
            "100%": { transform: "scale(1)" },
          },
          "shimmer": {
            "0%": { backgroundPosition: "-200% 0" },
            "100%": { backgroundPosition: "200% 0" },
          },
          "confetti": {
            "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
            "100%": { transform: "translateY(-100vh) rotate(720deg)", opacity: "0" },
          },
          "bounce-in": {
            "0%": { transform: "scale(0)", opacity: "0" },
            "50%": { transform: "scale(1.1)" },
            "100%": { transform: "scale(1)", opacity: "1" },
          },
          "shake": {
            "0%, 100%": { transform: "translateX(0)" },
            "25%": { transform: "translateX(-5px)" },
            "75%": { transform: "translateX(5px)" },
          },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
          "float": "float 3s ease-in-out infinite",
          "pulse-soft": "pulse-soft 2s ease-in-out infinite",
          "slide-up": "slide-up 0.5s ease-out",
          "slide-in-left": "slide-in-left 0.4s ease-out",
          "scale-bounce": "scale-bounce 0.3s ease-out",
          "shimmer": "shimmer 2s linear infinite",
          "confetti": "confetti 2s ease-out forwards",
          "bounce-in": "bounce-in 0.4s ease-out",
          "shake": "shake 0.4s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
