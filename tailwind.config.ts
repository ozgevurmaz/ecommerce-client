import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  theme: {
    fontSize: {
      "heading1-bold": [
        "60px",
        {
          lineHeight: "100%",
          fontWeight: "500",
        },
      ],
      "heading2-bold": [
        "50px",
        {
          lineHeight: "100%",
          fontWeight: "500",
        },
      ],
      "heading3-bold": [
        "30px",
        {
          lineHeight: "100%",
          fontWeight: "500",
        },
      ],
      "heading4-bold": [
        "24px",
        {
          lineHeight: "100%",
          fontWeight: "500",
        },
      ],
      "heading5-bold": [
        "20px",
        {
          lineHeight: "100%",
          fontWeight: "500",
        },
      ],
      "body-bold": [
        "18px",
        {
          lineHeight: "100%",
          fontWeight: "500",
        },
      ],
      "body-semibold": [
        "18px",
        {
          lineHeight: "100%",
          fontWeight: "400",
        },
      ],
      "body-medium": [
        "18px",
        {
          lineHeight: "100%",
          fontWeight: "300",
        },
      ],
      "base-bold": [
        "16px",
        {
          lineHeight: "100%",
          fontWeight: "500",
        },
      ],
      "base-medium": [
        "16px",
        {
          lineHeight: "100%",
          fontWeight: "300",
        },
      ],
      "small-bold": [
        "14px",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
      "small-medium": [
        "14px",
        {
          lineHeight: "140%",
          fontWeight: "300",
        },
      ],
    },
    extend: {
      colors: {
        orange: "#ED772D",
        grey: "#44403D",
        nude: "#F5E3CD",
        brown: "#BB9D7B",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
