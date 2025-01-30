import { useLocation, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import useMovieData from "../../hooks/useMovieData";

const MovieRecipe = () => {
  const location = useLocation();
  const { genreId, genreName } = location.state || {};
  const [movies, setMovies] = useState([]);
  const { fetchPopularMoviesByGenre, fetchVideos } = useMovieData();
  const [searchTerm, setSearchTerm] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [video, setVideo] = useState({});
  const [movieTitle, setMovieTitle] = useState("");

  useEffect(() => {
    fetchPopularMoviesByGenre(genreId).then((movies) => {
      setMovies(movies);
      setMovieTitle(movies[0].title);
      if (movies.length > 0) {
        fetchVideos(movies[0].id).then((video) => {
          console.log(video);
          setVideo(video);
        });
      }
    });
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
    <div className="font-mori pt-20 relative w-full">
      {/* Background Video */}
      <div className="relative w-full h-[100vh]">
        {video.key ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={`https://www.youtube.com/embed/${video.key}?autoplay=1&loop=1&mute=1&cc_load_policy=0&controls=0&playlist=${video.key}`}
            title="Latest Official Movie Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-black">
            <p className="text-white text-xl">Loading official trailer...</p>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

        <div className="absolute bottom-60 left-10 text-white text-6xl font-bold z-10">
          {movieTitle}
        </div>
      </div>

      {/* Recipe Section */}
      <div className="pb-10">
        <div className="px-20">
          <div className="py-12 mb-24 bg-gradient-to-r from-[#ddf1f6] to-[#45c0d9] rounded-sm">
            <h1 className="text-4xl font-semibold px-10 text-black">
              {genreName}
            </h1>
          </div>
          <h2 className="text-2xl py-3 font-bold">Recipes</h2>
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

        <div className="pr-40 pl-20 flex justify-between gap-4 w-full sm:w-auto">
        <h2 className="text-2xl py-3 font-bold">{genreName} Movies</h2>
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

        <div className="px-20 py-10 relative pb-10">
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
