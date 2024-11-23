import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundOpacity: {
        "10": "0.1",
        "20": "0.2",
        "80": "0.8",
        "90": "0.9",
      },
      colors: {
        white: {
          DEFAULT: "#FFFFFF",
          10: "rgba(255, 255, 255, 0.1)",
          20: "rgba(255, 255, 255, 0.2)",
          80: "rgba(255, 255, 255, 0.8)",
          90: "rgba(255, 255, 255, 0.9)",
        },
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-white/10",
    "bg-white/20",
    "bg-white/80",
    "bg-white/90",
    "bg-black/10",
    "bg-black/20",
    "bg-black/80",
    "bg-black/90",
  ],
}

export default config
