import { useState, useEffect } from "react";
import useRecipeData from "../../hooks/useRecipeData";
import { useLocation } from "react-router-dom";

const Recipe = () => {
  const [recipe, setRecipe] = useState(null);
  const { fetchRecipeDetails } = useRecipeData();
  const location = useLocation();
  const { recipeId } = location.state || {};

  const stripHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    fetchRecipeDetails(recipeId).then((recipe) => {
      const sanitizedRecipe = {
        ...recipe,
        instructions: stripHTML(recipe.instructions),
      };
      setRecipe(sanitizedRecipe);
      console.log(recipe);
    });
  }, [recipeId]);

  return (
    <div className="font-dmsans pt-10 lg:pt-16 bg-customBackground dark:bg-zinc-900 w-full text-gray-800 dark:text-customBackground">
      {recipe && (
        <div className="flex flex-col lg:flex-row border-y-2 border-accentBackground">
          <div className="w-full lg:w-1/2 p-10">
            <img
              src={recipe.image}
              alt={recipe.title}
              className=""
            />
          </div>
          <div className="flex flex-col gap-10 w-full lg:w-1/2 border-t-2 lg:border-t-0 lg:border-l-2 border-accentBackground p-10">
            <h1 className=" text-5xl md:text-7xl font-semibold">
              {recipe.title}
            </h1>
            <div className="flex flex-row lg:flex-col space-x-6">
              <h2 className="text-lg">Servings: {recipe.servings}</h2>
              <h2 className="text-lg">
                Preparation time: {recipe.readyInMinutes} minutes
              </h2>
            </div>
            <div>
              <h2 className="text-2xl">Ingredients</h2>
              <ul className="list-disc list-inside">
                {recipe.extendedIngredients?.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl">Instructions</h2>
              {recipe.instructions ? (
                <p className="whitespace-pre-line">{recipe.instructions}</p>
              ) : (
                <p>No instructions available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;
