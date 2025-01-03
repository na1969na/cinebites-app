import { useState, useEffect, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import useMovieData from "../../hooks/useMovieData";
import useRecipeData from "../../hooks/useRecipeData";

const Movie = () => {
  const location = useLocation();
  const { genreId, genreName, genreColor } = location.state || {};
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

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="font-mori p-10 md:p-16 bg-zinc-950 text-customBackground">
      {/* Movie Section */}
      <div className="flex-1">
        <div className="py-10 text-left">
          <h1 className="py-5 text-4xl sm:text-6xl font-semibold">
            Movies in{" "}
            <span className={`${genreColor} text-zinc-950 p-3 rounded-md`}>
              {genreName}
            </span>
          </h1>
        </div>
        <div>
          <h2 className="text-3xl font-semibold">
            Top 20 {genreName} Movies Today
          </h2>
        </div>
        <div className="relative overflow-hidden bg-zinc-950">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth">
            {filteredMovies.map(
              (movie) =>
                movie.backdrop_path && (
                  <div
                    key={movie.id}
                    className="min-w-[200px] lg:min-w-[250px] py-5 lg:py-10 transition-transform duration-300 ease-in-out group"
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

        <div className="text-center">
          <Link to="/" className="text-accentColor">
            Explore More
          </Link>
        </div>
      </div>

      {/* Recipe Section */}
      <div>
        <div className="py-10 text-left">
          <h1 className="py-5 text-4xl sm:text-6xl font-semibold">Recipes</h1>
        </div>
        <div>
          <h2 className="text-3xl font-semibold">Popular Recipes</h2>
        </div>
        <div className="overflow-x-scroll scrollbar-hide bg-zinc-950 p-4">
          <div className="flex gap-5">
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
                    className="mt-2 object-cover hover:opacity-60 transition duration-300 rounded"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <Link to="/">Explore More</Link>
      </div>
    </div>
  );
};

export default Movie;
