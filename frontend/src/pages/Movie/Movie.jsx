import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const Movie = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [isResizing, setIsResizing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const MAX_SIDEBAR_WIDTH = 600;
  const MIN_SIDEBAR_WIDTH = 200;

  const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
  const RECIPES_API_KEY = import.meta.env.VITE_RECIPE_API_KEY;

  const MOVIES_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_API_KEY}&language=en-US&with_genres=${id}`;
  const GENRE_API_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${MOVIE_API_KEY}&language=en-US`;
  const RECIPES_API_URL = `https://api.spoonacular.com/recipes/random?apiKey=${RECIPES_API_KEY}&number=20`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(MOVIES_API_URL);
        setMovies(response.data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchGenreName = async () => {
      try {
        const response = await axios.get(GENRE_API_URL);
        const genre = response.data.genres.find(
          (genre) => genre.id.toString() === id
        );
        setGenreName(genre?.name || "Unknown Genre");
      } catch (error) {
        console.error("Error fetching genre name:", error);
      }
    };

    const fetchRecipes = async () => {
      try {
        const response = await axios.get(RECIPES_API_URL);
        setRecipes(response.data.recipes || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchMovies();
    fetchGenreName();
    fetchRecipes();
  }, [MOVIES_API_URL, GENRE_API_URL, RECIPES_API_URL, id]);

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
        <div className="flex justify-between p-10">
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
              <ArrowRightIcon class="h-6 w-6 text-gray-800" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 pt-10 px-10 bg-gray-200">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative p-0.5 rounded-lg hover: transition duration-300 ease-in-out font-dmsans"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-40 sm:w-44 md:w-48 lg:w-60 h-auto rounded-sm"
              />
              <p className="mt-2 text-gray-400">
                {new Date(movie.release_date).getFullYear()}
              </p>
              <h2 className="mb-10 text-4xl">{movie.title}</h2>
            </div>
          ))}
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
        <ul className="mt-10 grid grid-cols-2 gap-0">
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
        </ul>
      </div>
    </div>
  );
};

export default Movie;
