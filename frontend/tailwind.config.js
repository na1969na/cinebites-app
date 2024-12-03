/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBackground: "#F8F4EC",
        accentBackground: "#DD482A",
        customElements: "#FDFDFD",
      },
      fontFamily: {
        publico: ["PublicoBanner", "serif"],
        dmsans: ["DM Sans", "serif"],
        helvetica: ["Helvetica", "sans-serif"],
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
  plugins: [],
  darkMode: "class",
};
