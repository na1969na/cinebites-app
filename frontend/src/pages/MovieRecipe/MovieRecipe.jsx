import { useState, useEffect, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import useMovieData from "../../hooks/useMovieData";
import useRecipeData from "../../hooks/useRecipeData";

const MovieRecipe = () => {
  const location = useLocation();
  const { genreId, genreName, genreColor } = location.state || {};
  const [movies, setMovies] = useState([]);
  const { fetchMovies } = useMovieData(genreId);
  const { fetchRecipesByGenre } = useRecipeData(genreId);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchMovies().then((movies) => setMovies(movies));
  }, [genreId]);

  // useEffect(() => {
  //   fetchRecipesByGenre().then((recipes) => {
  //     setRecipes(recipes);
  //     console.log(recipes);
  //   });
  // }, []);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  return (
    <div className="font-mori pt-16 px-20">
      {/* Movie Section */}
      <div className="border-b border-secondaryColor py-8">
        <h1 className="text-4xl sm:text-5xl border-b border-secondaryColor pb-8">
          {genreName}
        </h1>
        <Link
          className="flex text-center items-center py-10 cursor-pointer gap-5"
          to={{
            pathname: "/my-list",
          }}
          state={{ selectedTab: "Movies" }}
        >
          <h2 className="text-3xl">My List</h2>
          <ChevronRightIcon class="h-6 w-6" />
        </Link>
        <h2 className="py-3 text-3xl">Top 20 {genreName} Movies Today</h2>
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

        <div className="flex items-center space-x-4">
          <Link
            to={{
              pathname: "/movies",
            }}
            state={{
              genreId: genreId,
              genreName: genreName,
              genreColor: genreColor,
            }}
            className="border-2 border-secondaryColor px-4 py-2 rounded-full text-lg flex items-center justify-center hover:bg-secondaryColor hover:text-primaryColor transition duration-300"
          >
            Explore More
            <ArrowRightIcon className="h-6 w-6 ml-2" />
          </Link>
        </div>
      </div>

      {/* Recipe Section */}
      <div className="mt-20">
        <div className="pb-20">
          <h1 className="py-8 text-4xl sm:text-5xl">Recipes</h1>
          <Link
            className="flex text-center items-center py-10 cursor-pointer gap-5"
            to={{
              pathname: "/my-list",
            }}
            state={{ selectedTab: "Recipes" }}
          >
            <h2 className="text-3xl">My List</h2>
            <ChevronRightIcon class="h-6 w-6" />
          </Link>
          <h2 className="text-3xl py-3">Popular Recipes</h2>
          <div className="overflow-x-scroll scrollbar-hide pb-10">
            <div className="flex gap-3">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="flex-shrink-0 w-64 flex flex-col items-center"
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
                      className="mt-2 object-cover hover:opacity-60 transition duration-300 rounded-lg w-64 h-64"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to={{
                pathname: "/recipes",
              }}
              state={{
                genreId: genreId,
                genreName: genreName,
                genreColor: genreColor,
              }}
              className="border-2 border-secondaryColor px-4 py-2 rounded-full text-lg flex items-center justify-center hover:bg-secondaryColor hover:text-primaryColor transition duration-300"
            >
              Explore More
              <ArrowRightIcon className="h-6 w-6 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRecipe;
