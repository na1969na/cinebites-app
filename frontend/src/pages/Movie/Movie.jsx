import { useState, useEffect, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import useMovieData from "../../hooks/useMovieData";
import useRecipeData from "../../hooks/useRecipeData";

const Movie = () => {
  const location = useLocation();
  const { genreId, genreName } = location.state || {};
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [isResizing, setIsResizing] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchMovies } = useMovieData(genreId);
  const { fetchRecipesByGenre } = useRecipeData(genreId);
  const [recipes, setRecipes] = useState([]);
  const [gridCols, setGridCols] = useState("grid-cols-1");
  const [isOpen, setIsOpen] = useState(false);

  const MAX_SIDEBAR_WIDTH = 600;
  const MIN_SIDEBAR_WIDTH = 200;

  useEffect(() => {
    fetchMovies().then((movies) => setMovies(movies));
  }, [genreId]);

  useEffect(() => {
    fetchRecipesByGenre().then((recipes) => {
      setRecipes(recipes);
      console.log(recipes);
    });
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (isResizing) {
        const newWidth = window.innerWidth - e.clientX;
        setSidebarWidth(
          Math.min(MAX_SIDEBAR_WIDTH, Math.max(MIN_SIDEBAR_WIDTH, newWidth))
        );
      }
    },
    [isResizing]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (sidebarWidth > 400) {
      setGridCols("grid-cols-2");
    } else {
      setGridCols("grid-cols-1");
    }
  }, [sidebarWidth]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="font-publico flex flex-col md:flex-row pt-10 md:pt-16">
      <div className="bg-accentBackground py-5 block md:hidden">
        <div className="flex overflow-x-auto gap-10">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="flex-shrink-0 w-40 h-40 rounded-full"
            >
              <Link
                to={{
                  pathname: "/recipe",
                }}
                state={{ recipeId: recipe.id }}
              >
                <div>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="rounded-full w-40 h-40 object-cover hover:opacity-60 transition duration-300"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 bg-customBackground dark:bg-zinc-900">
        <div className="block lg:flex justify-between px-10 py-7">
          <h1 className="text-4xl text-gray-800 dark:text-customBackground sm:text-4xl">
            Movies in <span className="text-accentBackground">{genreName}</span>
          </h1>
          <div className="flex justify-center font-dmsans border-b-2 border-gray-800 dark:border-customBackground gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border-none outline-none bg-customBackground dark:bg-zinc-900 dark:text-customBackground w-full lg:w-auto"
            />
            <button>
              <ArrowRightIcon className="h-6 w-6 text-gray-800 dark:text-customBackground" />
            </button>
          </div>
        </div>
        <div className="pt-0 lg:pt-10 px-5 lg:px-10 divide-y divide-black dark:divide-customBackground bg-gray-200 dark:bg-zinc-800 overflow-y-auto h-[calc(100vh-12.625rem)] lg:h-[calc(100vh-10.125rem)]">
          {filteredMovies.map(
            (movie) =>
              movie.backdrop_path && (
                <div
                  key={movie.id}
                  className="lg:flex gap-5 py-5 lg:py-10 transition-transform duration-300 ease-in-out group"
                >
                  <div className="w-full lg:w-1/2">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                      alt={movie.title}
                      className="w-full h-auto rounded-sm"
                    />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <p className="mt-2 font-dmsans text-gray-400">
                      {new Date(movie.release_date).getFullYear()}
                    </p>
                    <h2 className="mb-6 font-dmsans text-xl lg:text-4xl font-semibold text-gray-800 dark:text-customBackground">
                      {movie.title}
                    </h2>
                    <p className="font-dmsans mb-6  dark:text-customBackground">
                      {movie.overview}
                    </p>
                    <p className="bg-blue-800 font-dmsans text-white text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800">
                      {movie.vote_average.toFixed(1)}
                    </p>
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      {/* Drag Handle */}
      <div
        className="bg-gray-500 cursor-col-resize w-1"
        onMouseDown={() => setIsResizing(true)}
      ></div>

      {/* Sidebar */}
      <div
        className="bg-accentBackground flex-shrink-0 p-5 overflow-y-auto hidden md:block h-[calc(100vh-4rem)]"
        style={{ width: `${sidebarWidth}px` }}
      >
        <h2 className="text-3xl sm:text-4xl text-center text-gray-800 hidden md:block">
          Recipes
        </h2>
        <ul className={`mt-5 grid ${gridCols} gap-0`}>
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              className="rounded-full flex flex-col items-center"
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
                  className="w-40 h-40 rounded-full mt-2 object-cover hover:opacity-60 transition duration-300"
                />
              </Link>
              <p className="mt-4 text-center font-dmsans">{recipe.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Movie;
