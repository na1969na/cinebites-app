/** @type {import('tailwindcss').Config} */
import tailwindScrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        primaryColor: "#F3F7CA",
        secondaryColor: "#A5E2FF",
        tertiaryColor: "#2E6F34",
        quaternaryColor: "#EE4027",
        fifthColor: "#F8F4EC",
        sixthColor: "#FF9F8A",
        seventhColor: "#190AF0",
      },
      fontFamily: {
        helvetica: ["Helvetica", "serif"],
        mori: ["Mori", "serif"],
        poppins: ["Poppins", "sans-serif"],
        timesNewRoman: ["Times New Roman", "serif"],
      },
    },
  },
  plugins: [tailwindScrollbarHide],
};
