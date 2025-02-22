import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import useMovieData from "../../hooks/useMovieData";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const { fetchMovies } = useMovieData();
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setSearchQuery(query);
    setInputValue(query);
  }, [query]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", searchQuery],
    queryFn: () => fetchMovies(searchQuery),
    enabled: !!searchQuery,
  });

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if (!inputValue) return;
    setSearchQuery(inputValue);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue) {
      handleSearch();
    }
  };

  return (
    <div className="bg-primaryColor">
      <div className="flex px-20 py-8 bg-quaternaryColor">
        <div className="border-b border-black flex w-full justify-between">
          <input
            type="text"
            placeholder="Search movies..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            className="px-5 pb-2 outline-none bg-transparent text-5xl placeholder-black"
          />
          <button className="ml-2 p-2 flex items-center" onClick={handleSearch}>
            <ArrowRightIcon className="h-12 w-12 mr-1" />
          </button>
        </div>
      </div>
      <div className="px-28 py-10 text-tertiaryColor">
        {data && data.length === 0 ? (
          <p className="font-bold text-3xl text-center">No movies found</p>
        ) : (
          <p className="font-bold text-2xl mb-10">
            movies found by {searchQuery}
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-20">
          {data &&
            data.map(
              (movie) =>
                movie.poster_path && (
                  <div
                    key={movie.id}
                    className="transition-transform duration-300 ease-in-out group hover:text-quaternaryColor"
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
                      <div className="px-3 pt-10 text-center">
                        <h1 className="text-3xl">
                          {movie.title}
                        </h1>
                        <p className="text-lg">
                          {movie.release_date}
                        </p>
                      </div>
                    </Link>
                  </div>
                )
            )}

          {isLoading && <div>Carregando mais dados...</div>}
          {isError && <div>Carregando mais dados...</div>}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
