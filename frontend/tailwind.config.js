/** @type {import('tailwindcss').Config} */
import tailwindScrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        accentBackground: "#DD482A",
        customElements: "#FDFDFD",
        accentColor: "#0AE448",
        accentColor2: "#FFFCE1",
      },
      fontFamily: {
        publico: ["PublicoBanner", "serif"],
        dmsans: ["DM Sans", "serif"],
        helvetica: ["Helvetica", "serif"],
        vastago: ["VastagoGrotesk", "serif"],
        mori: ["Mori", "serif"],
      },
      backgroundImage: {
        headerImage: "url('frontend/src/assets/header_img.jpg')",
      },
      keyframes: {
        blurInOut: {
          '0%, 90%': { filter: 'blur(0px)' },
          '50%': { filter: 'blur(10px)' },
        },
      },
      animation: {
        blurInOut: 'blurInOut 3s ease-in-out infinite',
      },
    },
  },
  plugins: [tailwindScrollbarHide],
};
