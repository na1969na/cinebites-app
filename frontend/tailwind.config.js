/** @type {import('tailwindcss').Config} */
import tailwindScrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        primaryColor: "#11318F",
        secondaryColor: "#EAEAEA",
        tertiaryColor: "#FEFBE1",
        quaternaryColor: "#FF4800",
      },
      fontFamily: {
        helvetica: ["Helvetica", "serif"],
        mori: ["Mori", "serif"],
      },
    },
  },
  plugins: [tailwindScrollbarHide],
};
