import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import useMovieData from "../../hooks/useMovieData";
import { DebounceInput } from "react-debounce-input";

const MovieRecipe = () => {
  const location = useLocation();
  const { genreId, genreName } = location.state || {};
  const { fetchPopularMoviesByGenre, fetchMovies } = useMovieData();
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState("MOVIES");

  // Fetch Popular Movies by Genre ID
  const {
    data: moviesData,
    isLoading: moviesLoading,
    error: moviesError,
  } = useQuery({
    queryKey: ["popularMovies", genreId],
    queryFn: () => fetchPopularMoviesByGenre(genreId),
    enabled: !!genreId,
  });

  // Serach movies by keyword
  const {
    data: searchResults,
    isLoading: searchLoading,
    error: searchError,
  } = useQuery({
    queryKey: ["movies", query],
    queryFn: () => fetchMovies(query),
    enabled: !!query,
  });

  const movies = query ? searchResults : moviesData;

  // Fetch recipes
  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="font-mori">
      <div className="px-20 py-10">
        <div className="mb-20">
          <h1 className="text-7xl text-primaryColor font-semibold">
            {genreName}
          </h1>
        </div>

        <div className="sm:hidden">
          <label className="sr-only">Select your country</label>
          <select
            id="tabs"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>MOVIES</option>
            <option>RECIPES</option>
          </select>
        </div>
        <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow-sm sm:flex">
          <li className="w-full focus-within:z-10">
            <button
              onClick={() => handleTabClick("MOVIES")}
              className={`inline-block w-full p-4 text-primaryColor border border-primaryColor rounded-s-lg focus:bg-accentColor2 focus:text active focus:outline-none ${
                activeTab === "MOVIES" ? "bg-accentColor2" : ""
              }`}
            >
              MOVIES
            </button>
          </li>
          <li className="w-full focus-within:z-10">
            <button
              onClick={() => handleTabClick("RECIPES")}
              className={`inline-block w-full p-4 text-primaryColor border border-primaryColor rounded-e-lg focus:bg-accentColor2 focus:outline-none ${
                activeTab === "RECIPES" ? "bg-accentColor2" : ""
              }`}
            >
              RECIPES
            </button>
          </li>
        </ul>

        {/* Recipe Tab */}
        {activeTab === "RECIPES" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-5 py-10">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="flex-shrink-0 w-50 flex flex-col items-center"
              >
                <Link
                  to={{
                    pathname: "/recipe",
                  }}
                  state={{ recipeId: recipe.id }}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="mt-2 object-cover hover:opacity-60 transition duration-300 w-50 h-40"
                  />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Movie Tab */}
        {activeTab === "MOVIES" && (
          <div className="px-5 py-10">
            <div className="flex justify-between gap-4 w-full sm:w-auto ">
              <div className="flex gap-6">
                <button>
                  <MagnifyingGlassIcon className="h-10 w-10" />
                </button>
                <DebounceInput
                  debounceTimeout={300}
                  minLength={2}
                  placeholder="Search movies..."
                  className="px-2 py-2 outline-none w-full lg:w-auto text-2xl"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="py-10 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {movies &&
                  movies.map(
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

                {movies && movies.length === 0 && <p>No movies found.</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieRecipe;
