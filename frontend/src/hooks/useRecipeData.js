import axios from "axios";

const RECIPES_API_KEY = import.meta.env.VITE_RECIPE_API_KEY;

const genreMapping = {
  28: "spicy",
  12: "grilled",
  16: "sweet, fruity",
  35: "snacks",
  80: "spicy, bold flavors",
  99: "healthy, clean",
  18: "hearty, comforting",
  10751: "pizza, burgers",
  14: "magical, sweet",
  36: "traditional, ancient",
  27: "dark, spicy, blood-red",
  10402: "light snacks, cocktails",
  9648: "savory, complex",
  10749: "chocolate, fondue",
  878: "futuristic, fusion",
  10770: "easy snacks, comfort",
  53: "spicy, exciting",
  10752: "hearty, filling",
  37: "barbecue, meat-heavy",
};

const useRecipeData = () => {
  // Fetch recipes by genre ID
  const fetchRecipesByGenre = async (genreId) => {
    try {
      const response = await axios.get(
        "https://api.spoonacular.com/recipes/complexSearch",
        {
          params: {
            apiKey: RECIPES_API_KEY,
            query: genreMapping[genreId] || genreId,
            number: 10,
          },
        }
      );
      return response.data.results;
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
