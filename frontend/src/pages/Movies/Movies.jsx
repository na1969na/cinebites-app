import { useLocation, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Movies = () => {
  const location = useLocation();
  const { genreId, genreName, genreColor } = location.state || {};
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="font-mori pt-16">
      <div className="px-20">
        <div className="flex py-8 justify-between">
          <h1 className="text-4xl sm:text-6xl font-semibold">
            <span className={`text-${genreColor}`}>{genreName}</span>
          </h1>
          <button className="cursor-pointer hover:opacity-70">
            <MagnifyingGlassIcon className="h-10 w-10" />
          </button>
          <div className="flex justify-center font-dmsans border-b gap-4 w-full sm:w-auto">
            <MagnifyingGlassIcon className="h-6 w-6" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border-none outline-none bg-transparent w-full lg:w-auto"
            />
            <button>
              <ArrowRightIcon className="h-6 w-6" />
            </button>
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

export default Movies;
