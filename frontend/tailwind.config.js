/** @type {import('tailwindcss').Config} */
import tailwindScrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        accentBackground: "#DD482A",
        customElements: "#FDFDFD",
        // accentColor: "#0AE448",
        accentColor2: "#FFFCE1",
        primaryColor: "#11318F",
        secondaryColor: "#EAEAEA",
        tertiaryColor: "#FEFBE1",
        quaternaryColor: "#FF6C19",
      },
      fontFamily: {
        helvetica: ["Helvetica", "serif"],
        mori: ["Mori", "serif"],
      },
    },
  },
  plugins: [tailwindScrollbarHide],
};
