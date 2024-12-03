import { useState, useEffect } from 'react';
import axios from 'axios';

const useRecipeData = () => { 
  const [recipes, setRecipes] = useState([]);

  const RECIPES_API_KEY = import.meta.env.VITE_RECIPE_API_KEY;
  const RECIPES_API_URL = `https://api.spoonacular.com/recipes/random?apiKey=${RECIPES_API_KEY}&number=20`;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(RECIPES_API_URL);
        setRecipes(response.data.recipes || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [RECIPES_API_URL]);

  return {
    recipes,
  };
}

export default useRecipeData;