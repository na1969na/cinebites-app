import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import useMovieData from "../../hooks/useMovieData";

const MovieRecipe = () => {
  const location = useLocation();
  const { genreId, genreName } = location.state || {};
  const { fetchPopularMoviesByGenre } = useMovieData();
  const [searchTerm, setSearchTerm] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [recipes, setRecipes] = useState([]);

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

  console.log(moviesData);

  // Fetch recipes
  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  const handleButtonClick = () => {
    setIsInputVisible(!isInputVisible);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="font-mori">
      <div className="relative w-full h-[80vh]">
        {moviesData && moviesData[0] && moviesData[0].backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original${moviesData[0].backdrop_path}`}
            alt={moviesData[0].title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-white text-xl">Loading background image...</p>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>

        <div className="absolute bottom-10 left-10 text-white text-7xl font-bold z-10">
          {moviesData && moviesData[0].original_title}
        </div>
      </div>

      <div className="p-20">
        <div className="mb-20">
          <h1 className="text-7xl text-primaryColor font-semibold">
            {genreName}
          </h1>
        </div>

        <div className="border-t border-gray-500">
          <h2 className="text-xl py-3 font-bold">Recipes</h2>
        </div>
        <div className="overflow-x-scroll scrollbar-hide pb-20">
          <div className="flex gap-3">
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
        </div>

        <div className="flex justify-between gap-4 w-full sm:w-auto border-t border-gray-500">
          <h2 className="text-xl py-3 font-bold">Movies</h2>
          <div className="flex gap-6">
            <button
              className="cursor-pointer hover:opacity-70 pt-10"
              onClick={handleButtonClick}
            >
              <MagnifyingGlassIcon className="h-10 w-10" />
            </button>
            {isInputVisible && (
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="px-2 border-b border-gray-500 outline-none bg-transparent w-full lg:w-auto text-2xl"
              />
            )}
          </div>
        </div>

        <div className="py-10 relative pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {moviesData &&
              moviesData.map(
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRecipe;
