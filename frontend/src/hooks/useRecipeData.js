import axios from "axios";

const RECIPES_API_KEY = import.meta.env.VITE_RECIPE_API_KEY;

// Custom hook to fetch recipe data
const useRecipeData = () => {

  // Fetch recipes by genre ID
  const fetchRecipesByGenre = async () => {
    try {
      const response = await axios.get(
        "https://api.spoonacular.com/recipes/random",
        {
          params: {
            apiKey: RECIPES_API_KEY,
            number: 10,
          },
        }
      );
      return response.data.recipes;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return [];
    }
  };

  // Fetch recipe details by recipe ID
  const fetchRecipeDetails = async (recipeId) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information`,
        {
          params: {
            apiKey: RECIPES_API_KEY,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  return { fetchRecipesByGenre, fetchRecipeDetails };
};

export default useRecipeData;
