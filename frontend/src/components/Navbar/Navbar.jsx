import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    setSearchQuery("");
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clickSearch = () => {
    if (!searchQuery) return;
    navigate(`/search?query=${searchQuery}`);
    toggleSearch();
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery) {
      navigate(`/search?query=${searchQuery}`);
      toggleSearch();
    }
  };

  return (
    <header className="top-0 left-0 w-full z-50 font-poppins fixed bg-fifthColor">
      <div className="flex items-center justify-between px-20 py-4">
        <Link to="/about" className="-m-1.5 text-lg">
          about
        </Link>
        <Link to="/" className="-m-1.5 font-semibold text-xl md:text-3xl">
          CineBites
        </Link>
        <div className="flex gap-1">
          <button onClick={toggleSearch}>
            <MagnifyingGlassIcon className="h-6 w-6 font-bold" />
          </button>
          <p className="text-base">search</p>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-full bg-primaryColor p-36 transition-all duration-700 ease-in-out z-50 ${
          isSearchVisible ? "translate-y-0" : "-translate-y-full"
        } overflow-hidden`}
      >
        <div className="flex border-b border-black w-full">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            className="w-full p-2 outline-none bg-transparent text-5xl placeholder-black"
          />
          <button onClick={clickSearch} className="ml-2 p-2 flex items-center">
            <ArrowRightIcon className="h-12 w-12 mr-1" />
          </button>
          <button
            onClick={toggleSearch}
            className="absolute top-8 right-12 p-2 flex items-center"
          >
            <XMarkIcon className="h-10 w-10" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
