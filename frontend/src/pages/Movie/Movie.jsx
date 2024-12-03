import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { PlayIcon } from "@heroicons/react/24/outline";
import useMovieData from "../../hooks/useMovieData";

const Movie = () => {
  const { id } = useParams();
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [isResizing, setIsResizing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  const MAX_SIDEBAR_WIDTH = 600;
  const MIN_SIDEBAR_WIDTH = 200;

  const {
    movies,
    genreName,
    recipes,
    movieDetails,
    director,
    fetchMovieDetails,
    fetchMovieCredits,
  } = useMovieData(id);

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
      <div className="flex-1">
        <div className="flex justify-between px-10 py-7">
          <h1 className="text-4xl text-gray-800 sm:text-4xl">
            Movies in <span className="text-accentBackground">{genreName}</span>
          </h1>
          <div className="flex justify-center font-dmsans border-b-2 border-gray-800 gap-4 mr-10">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border-none outline-none"
            />
            <button>
              <ArrowRightIcon className="h-6 w-6 text-gray-800" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 pt-10 px-10 bg-gray-200 overflow-y-auto h-[calc(100vh-200px)]">
          {filteredMovies.map(
            (movie) =>
              movie.backdrop_path && (
                <div
                  key={movie.id}
                  className="p-0.5 rounded-lg transition-transform duration-300 ease-in-out"
                  onMouseEnter={() => handleMouseEnter(movie.id)}
                  onMouseLeave={handleMouseLeave}
                  style={{ cursor: "pointer" }}
                >
                  <div className="relative group">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                      alt={movie.title}
                    />

                    {hoveredMovie === movie.id && movieDetails && (
                      <div
                        className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-dmsans p-4"
                      >
                        <button
                          // onClick={openModal(movie.id)}
                          className="border  text-white px-6 py-1 rounded-full flex hover:bg-white hover:text-gray-800 transition"
                        >
                          <PlayIcon className="h-6 w-6" />
                          Trailer
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="mt-2 font-dmsans text-gray-400">
                    {new Date(movie.release_date).getFullYear()}
                  </p>

                  <h2 className="mb-10 font-dmsans text-xl lg:text-2xl font-semibold text-gray-800">
                    {movie.title}
                  </h2>
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
