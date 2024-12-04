import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { PlayIcon } from "@heroicons/react/24/outline";
import useMovieData from "../../hooks/useMovieData";

const Movie = () => {
  const location = useLocation();
  const { genreId, genreName } = location.state || {};
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [isResizing, setIsResizing] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  const MAX_SIDEBAR_WIDTH = 600;
  const MIN_SIDEBAR_WIDTH = 200;

  const {
    recipes,
    movieDetails,
    fetchMovies,
    fetchMovieDetails,
    fetchMovieCredits,
  } = useMovieData(genreId);

  useEffect(() => {
    fetchMovies().then((movies) => setMovies(movies));
  }, [genreId]);

  const handleMouseEnter = async (movieId) => {
    setHoveredMovie(movieId);
    await fetchMovieDetails(movieId);
    await fetchMovieCredits(movieId);
  };

  const handleMouseLeave = () => {
    setHoveredMovie(null);
  };

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

  // const openModal = async (movieId) => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setTrailerUrl("");
  // };

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="font-publico flex bg-customElements">
      {/* Main Content */}
      <div className="flex-1 dark:bg-zinc-900">
        <div className="flex justify-between px-10 py-7">
          <h1 className="text-4xl text-gray-800 dark:text-customBackground sm:text-4xl">
            Movies in <span className="text-accentBackground">{genreName}</span>
          </h1>
          <div className="flex justify-center font-dmsans border-b-2 border-gray-800 dark:border-customBackground gap-4 mr-10">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border-none outline-none dark:bg-zinc-900 dark:text-customBackground"
            />
            <button>
              <ArrowRightIcon className="h-6 w-6 text-gray-800 dark:text-customBackground" />
            </button>
          </div>
        </div>
        <div className="pt-10 px-10 divide-y divide-black dark:divide-customBackground bg-gray-200 dark:bg-zinc-800 overflow-y-auto h-[calc(100vh-200px)]">
          {filteredMovies.map(
            (movie) =>
              movie.backdrop_path && (
                <div
                  key={movie.id}
                  className="flex gap-5 py-10 transition-transform duration-300 ease-in-out group"
                  // onMouseEnter={() => handleMouseEnter(movie.id)}
                  // onMouseLeave={handleMouseLeave}
                >
                  <div className="w-1/2">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                      alt={movie.title}
                      className="w-full h-auto rounded-sm"
                    />
                  </div>

                  {hoveredMovie === movie.id && movieDetails && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-dmsans p-4 w-1/2">
                      <button
                        // onClick={openModal(movie.id)}
                        className="border  text-white px-6 py-1 rounded-full flex hover:bg-white hover:text-gray-800 transition"
                      >
                        <PlayIcon className="h-6 w-6" />
                        Trailer
                      </button>
                    </div>
                  )}

                  <div className="w-1/2">
                    <p className="mt-2 font-dmsans text-gray-400">
                      {new Date(movie.release_date).getFullYear()}
                    </p>
                    <h2 className="mb-6 font-dmsans text-xl lg:text-4xl font-semibold text-gray-800 dark:text-customBackground">
                      {movie.title}
                    </h2>
                    <p className="font-dmsans mb-6  dark:text-customBackground">{movie.overview}</p>
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
        className="bg-accentBackground flex-shrink-0 p-5"
        style={{ width: `${sidebarWidth}px` }}
      >
        <h2 className="text-3xl sm:text-4xl text-center text-gray-800">
          Recipes
        </h2>
        {/* <ul className="mt-10 grid grid-cols-2 gap-0">
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              className="text-white rounded-full flex flex-col items-center"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-40 h-40 rounded-full mt-2 object-cover"
              />
              <p className="mt-2 text-center">{recipe.title}</p>
            </li>
          ))}
        </ul> */}
      </div>

      {/* Video */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative bg-white max-w-2xl w-full">
            <button
              // onClick={closeModal}
              className="fixed top-2 right-2 text-white text-7xl z-50"
            >
              ✕
            </button>
            <div className="aspect-w-200 aspect-h-100">
              <iframe
                width="100%"
                height="100%"
                src={trailerUrl}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
