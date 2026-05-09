import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101828",
        mist: "#f6f8fb",
        line: "#e6eaf0",
        coral: "#f9735b",
        teal: "#0f9f8f",
        gold: "#f4b740"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(16, 24, 40, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
