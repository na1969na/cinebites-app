import { useLocation, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import useMovieData from "../../hooks/useMovieData";

const MovieRecipe = () => {
  const location = useLocation();
  const { genreId, genreName } = location.state || {};
  const [movies, setMovies] = useState([]);
  const { fetchPopularMoviesByGenre } = useMovieData();
  const [searchTerm, setSearchTerm] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchPopularMoviesByGenre(genreId).then((movies) => setMovies(movies));
  }, [genreId]);

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
    <div className="font-mori pt-16">
      <div className="px-20">
        <div className="py-10 text-center flex items-center justify-center border-b border-quaternaryColor">
          <h1 className="text-8xl font-semibold">{genreName}</h1>
        </div>

        {/* Recipe Section */}
        <div className="py-10">
          <h2 className="text-2xl py-3 font-bold">Recommended Recipes</h2>
          <div className="overflow-x-scroll scrollbar-hide pb-10">
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
                      className="mt-2 object-cover hover:opacity-60 transition duration-300 rounded-3xl w-64 h-64"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full sm:w-auto">
          <button
            className="cursor-pointer hover:opacity-70"
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
              className="px-2 border-b border-secondaryColor outline-none bg-transparent w-full lg:w-auto text-2xl"
            />
          )}
        </div>

        <div className="relative overflow-hidden pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {movies.map(
              (movie) =>
                movie.backdrop_path && (
                  <div
                    key={movie.id}
                    className="transition-transform duration-300 ease-in-out group"
                  >
                    <div className="w-full">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-auto rounded-3xl"
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

export default MovieRecipe;
