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
        // accentColor: "#0AE448",
        accentColor2: "#FFFCE1",
        primaryColor: "#add8e6",
        secondaryColor: "#BEF3FE",
        tertiaryColor: "#F3F0E7",
        quaternaryColor: "#FFFCE1",
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
        textGradient: 'radial-gradient(78.77% 78.77% at 71.71% 30.77%, #f0fcff 0%, #9bedff 67.21%, #98ecff 76.04%, #5be1ff 84.9%, #00bae2 94.79%)',
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
