import { useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    setSearchQuery("");
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <header className="top-0 left-0 w-full z-1000 bg-transparent">
      <div className="text-xl md:text-3xl flex justify-between px-20 py-4">
        <Link to="/" className="-m-1.5">
          <div className="flex items-center font-semibold">CineBites</div>
        </Link>
        <div className="flex gap-1">
          <button onClick={toggleSearch}>
            <MagnifyingGlassIcon className="h-6 w-6 font-bold" />
          </button>
          <p className="text-base">Search</p>
        </div>
      </div>
      {isSearchVisible && (
        <div className="absolute top-0 left-0 w-full bg-primaryColor p-36 flex items-center">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full p-2 outline-none bg-transparent text-5xl border-b border-secondaryColor text-secondaryColor"
          />
          <Link
            to={`/search?query=${searchQuery}`}
            onClick={toggleSearch}
            className="ml-2 p-2 text-secondaryColor flex items-center"
          >
            <ArrowRightIcon className="h-12 w-12 mr-1" />
          </Link>
          <button
            onClick={toggleSearch}
            className="absolute top-8 right-12 p-2 text-secondaryColor flex items-center"
          >
            <XMarkIcon className="h-10 w-10" />
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
