import { useState, useEffect } from "react";
import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ページロード時にテーマを設定
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

  // テーマを切り替える関数
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

  return (
    <header className="bg-customBackground dark:bg-black text-gray-800 dark:text-customBackground sticky top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-3"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 font-publico text-3xl">
          <a href="/" className="-m-1.5">
            <div className="flex items-center">
              CineBites
              <img
                src="/cinebites_icon.svg"
                alt="CineBites Icon"
                className="ml-1 h-8 w-8"
              />
            </div>
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="/about"
            className="text-lg font-semibold"
          >
            About
          </a>
        </div>
        <div>
          <button
            onClick={toggleTheme}
            className="ml-4 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
          >
            {isDarkMode ? (
              <SunIcon class="h-6 w-6 text-customBackground" />
            ) : (
              <MoonIcon class="h-6 w-6 text-gray-800" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
