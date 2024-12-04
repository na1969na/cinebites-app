import { useState, useEffect } from "react";
import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem("color-theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  const getBackgroundColor = () => {
    const isMoviesPage = location.pathname === "/movies";
    if (isMoviesPage) {
      return isDarkMode ? "bg-zinc-900" : "bg-customBackground";
    }
    return "bg-transparent";
  };

  const getTextColor = () => {
    const isMoviesPage = location.pathname === "/movies";
    if (isMoviesPage) {
      return isDarkMode ? "text-customBackground" : "text-gray-800";
    }
    return "text-customBackground";
  };

  return (
    <header
      className={`absolute top-0 left-0 w-full z-50 ${getBackgroundColor()} ${getTextColor()}`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between py-3 px-4 lg:px-4 h-[3rem] md:h-[4rem]"
        aria-label="Global"
      >
        <div className="flex">
          <a
            href="/about"
            className="lg:text-lg transform transition-transform duration-300 hover:rotate-6"
          >
            Who We Are
          </a>
        </div>
        <div className="font-publico text-xl md:text-3xl">
          <a href="/" className="-m-1.5">
            <div className="flex items-center">
              CineBites
              <img
                src="/cinebites_icon.svg"
                alt="CineBites Icon"
                className="ml-1 h-6 md:h-8 w-6 md:w-8"
              />
            </div>
          </a>
        </div>
        <div className="flex items-center gap-0 md:gap-6">
          <button
            onClick={toggleTheme}
            className="ml-4 focus:outline-none 
            rounded-lg text-sm p-2.5"
          >
            {isDarkMode ? (
              <SunIcon className={`h-6 w-6 text-customBackground ${getTextColor()}`} />
            ) : (
              <MoonIcon className={`h-6 w-6 text-customBackground ${getTextColor()}`} />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
