import { useLocation, Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import useMovieData from "../../hooks/useMovieData";
import { generateContent } from "../../hooks/useGoogleGenerativeAI";
import FlipCard from "../../components/FlipCard/FlipCard";

const MovieRecipe = () => {
  const location = useLocation();
  const { genreId, genreName } = location.state || {};
  const { fetchPopularMoviesByGenre } = useMovieData();
  const [activeTab, setActiveTab] = useState("MOVIES");
  const observer = useRef();
  const [flippedCards, setFlippedCards] = useState([]);

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

  const {
    data: recipes,
    isLoading: isRecipeLoading,
    isError: isRecipeError,
  } = useQuery({
    queryKey: ["gemini", genreName],
    queryFn: () => generateContent(genreName),
    enabled: !!genreName,
  });

  useEffect(() => {
    if (recipes) {
      setFlippedCards(new Array(recipes.length).fill(false));
    }
  }, [recipes]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCardClick = (index) => {
    setFlippedCards((prev) =>
      prev.map((card, i) => (i === index ? !card : card))
    );
  };

  return (
    <div>
      <div className="px-20 pt-24">
        <div className="flex justify-between text-2xl">
          <h1>Movies / {genreName}</h1>
          <div className="flex justify-between">
            <button
              onClick={() => handleTabClick("MOVIES")}
              className={`hover:text-black ${
                activeTab === "MOVIES" ? "text-black" : "text-gray-300"
              }`}
            >
              Movies
            </button>
            <p className="px-2">/</p>
            <button
              onClick={() => handleTabClick("RECIPES")}
              className={`hover:text-black ${
                activeTab === "RECIPES" ? "text-black" : "text-gray-300"
              }`}
            >
              Recipes
            </button>
          </div>
        </div>

        {/* Recipe Tab */}
        {activeTab === "RECIPES" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 py-10">
            {isRecipeLoading && <div>Loading recipes...</div>}
            {isRecipeError && <div>Error loading recipes...</div>}
            {recipes &&
              recipes.map((recipe, index) => (
                <FlipCard
                  key={recipe.id}
                  data={recipe}
                  isFlipped={flippedCards[index] || false}
                  onClick={() => handleCardClick(index)}
                />
              ))}
          </div>
        )}

        {/* Movie Tab */}
        {activeTab === "MOVIES" && (
          <div className="px-18 py-10">
            <div className="py-10 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {isLoading && <div>Loading movies...</div>}
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
                            <div className="px-3 pt-10">
                              <h1 className="text-xl font-semibold">
                                {movie.title}
                              </h1>
                              <p className="text-lg pt-2 pb-5">
                                {new Date(movie.release_date).getFullYear()}
                              </p>
                            </div>
                          </Link>
                        </div>
                      )
                  )}

                {isFetching && <div>Loading more data...</div>}
                {isError && <div>Error loading data...</div>}
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
