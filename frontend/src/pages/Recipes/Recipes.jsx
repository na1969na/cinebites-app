import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Recipes = () => {
  const location = useLocation();
  const { genreId, genreName, genreColor } = location.state || {};
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleButtonClick = () => {
    setIsInputVisible(!isInputVisible);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="font-mori pt-16">
      <div className="px-20">
        <div className="flex py-8 justify-between">
          <h1 className="text-4xl sm:text-6xl font-semibold">{genreName}</h1>
          <div className="flex justify-center font-dmsans gap-4 w-full sm:w-auto">
            <button
              className="cursor-pointer hover:opacity-70"
              onClick={handleButtonClick}
            >
              <MagnifyingGlassIcon className="h-10 w-10" />
            </button>
            {isInputVisible && (
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="px-2 border-b border-secondaryColor outline-none bg-transparent w-full lg:w-auto text-3xl"
              />
            )}
          </div>
        </div>
        <div className="relative overflow-hidden pb-10">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth">
            {movies.map(
              (movie) =>
                movie.backdrop_path && (
                  <div
                    key={movie.id}
                    className="min-w-[200px] lg:min-w-[250px] transition-transform duration-300 ease-in-out group"
                  >
                    <div className="w-full">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-auto rounded-sm"
                      />
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
