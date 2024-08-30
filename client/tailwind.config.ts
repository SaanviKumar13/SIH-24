import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f6f9ff",
        "primary-dark": "#1c2434",
        secondary: "#4154f1",
        danger: "#e3342f",
      },
      fontFamily: {
        heading: ["Bricolage Grotesque", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
