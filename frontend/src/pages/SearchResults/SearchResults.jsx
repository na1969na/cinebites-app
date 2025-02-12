import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useMovieData from "../../hooks/useMovieData";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const { fetchMovies } = useMovieData();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: searchResults,
    isLoading: searchLoading,
    isError: searchError,
  } = useQuery({
    queryKey: ["movies", query],
    queryFn: () => fetchMovies(query),
    enabled: !!query,
  });

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="bg-tertiaryColor">
      <div className="flex px-20 py-8 bg-quaternaryColor">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full px-5 pb-5 outline-none bg-transparent text-5xl border-b border-black placeholder-black"
        />
        <Link
          to={`/search?query=${searchQuery}`}
          className="ml-2 p-2 flex items-center"
        >
          <ArrowRightIcon className="h-12 w-12 mr-1" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-1 px-20 py-10">
        {searchResults &&
          searchResults.map(
            (movie) =>
              movie.poster_path && (
                <div
                  key={movie.id}
                  className="transition-transform duration-300 ease-in-out group"
                >
                  <Link
                    to={{
                      pathname: "/movie",
                    }}
                    state={{ movie: movie }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-auto hover:opacity-60 transition duration-300"
                    />
                  </Link>
                </div>
              )
          )}

        {searchResults && searchResults.length === 0 && <p>No movies found.</p>}
      </div>
    </div>
  );
};

export default SearchResults;
