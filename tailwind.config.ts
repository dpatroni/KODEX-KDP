import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { kodex: { bg: "#050711", panel: "#0B1020", cyan: "#67E8F9", green: "#8EF0C7", purple: "#B794F6" } },
      boxShadow: { glow: "0 0 50px rgba(103,232,249,.12)" }
    }
  },
  plugins: []
};
export default config;
