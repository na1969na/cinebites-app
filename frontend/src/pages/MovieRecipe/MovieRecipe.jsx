import { useLocation, Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import useMovieData from "../../hooks/useMovieData";

const MovieRecipe = () => {
  const location = useLocation();
  const { genreId, genreName } = location.state || {};
  const { fetchPopularMoviesByGenre } = useMovieData();
  const [recipes, setRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState("MOVIES");
  const observer = useRef();

  // Fetch Popular Movies by Genre ID
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["popularMovies", genreId],
      queryFn: (pageParam) => fetchPopularMoviesByGenre(genreId, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
      enabled: !!genreId,
    });

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  const movies = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

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
          <h1 className="text-7xl text-primaryColor font-semibold text-center">
            {genreName}
          </h1>
        </div>

        <div className="sm:hidden">
          <label className="sr-only">Select your country</label>
          <select
            id="tabs"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
          <div className="px-20 py-10">
            <div className="py-10 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-20">
                {movies &&
                  movies.map(
                    (movie) =>
                      movie.poster_path && (
                        <div
                          key={movie.id}
                          ref={lastElementRef}
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
                            <div className="px-3 pt-10 text-center">
                              <h1 className="text-3xl font-semibold text-black">
                                {movie.title}
                              </h1>
                              <p className="text-lg text-gray-500">
                                {movie.release_date}
                              </p>
                            </div>
                          </Link>
                        </div>
                      )
                  )}

                {isLoading && <div>Carregando mais dados...</div>}
                {isFetching && <div>Carregando mais dados...</div>}
                {isError && <div>Carregando mais dados...</div>}
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
