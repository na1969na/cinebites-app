import { useState, useEffect } from 'react';
import axios from 'axios';

const MovieRecipeDisplay = ({ genre }) => {
  const [movies, setMovies] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
  const MOVIES_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_API_KEY}&language=en-US&with_genres=${genre.id}`;
  const RECIPES_API_KEY = import.meta.env.VITE_RECIPE_API_KEY;
  const RECIPES_API_URL = `https://api.spoonacular.com/recipes/random?apiKey=${RECIPES_API_KEY}&number=10`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(MOVIES_API_URL);
        setMovies(response.data.results);
        console.log("Movies fetched:", response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchRecipes = async () => {
      try {
        const response = await axios.get(RECIPES_API_URL);
        setRecipes(response.data.recipes);
        console.log("Recipes fetched:", response.data.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchMovies();
    fetchRecipes();
  }, [genre.id]);

  return (
    <div className="p-10 font-publico flex">
      <div className="w-3/4">
        <h1 className="text-5xl text-gray-800 sm:text-7xl text-center">
          Movies in {genre.name}
        </h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative p-2 text-white rounded-lg hover: transition duration-300 ease-in-out"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/4 pl-10">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-center">
          Recipes
        </h2>
        <ul className="mt-10 space-y-4">
          {recipes.map((recipe) => (
            <li key={recipe.id} className=" text-white rounded-full flex flex-col items-center">
              <img src={recipe.image} alt={recipe.title} className="w-40 h-40 rounded-full mt-2 object-cover" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieRecipeDisplay;
