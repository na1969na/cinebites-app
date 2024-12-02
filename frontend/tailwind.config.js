/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBackground: "#F8F4EC",
      },
      fontFamily: {
        publico: ["PublicoBanner", "serif"],
        dmsans: ["DM Sans", "serif"],
      },
      backgroundImage: {
        headerImage: "url('frontend/src/assets/header_img.jpg')",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
