import { useState, useEffect } from "react";
import useRecipeData from "../../hooks/useRecipeData";
import { useLocation } from "react-router-dom";

const Recipe = () => {
  const [recipe, setRecipe] = useState(null);
  const { fetchRecipeDetails } = useRecipeData();
  const location = useLocation();
  const { recipeId } = location.state || {};

  const formatInstructions = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const textContent = doc.body.textContent || "";
    return textContent.split(".").map((item, index) => (
      <p key={index}>
        {item.trim()}
      </p>
    ));
  };

  // useEffect(() => {
  //   fetchRecipeDetails(recipeId).then((recipe) => {
  //     setRecipe(recipe);
  //     console.log(recipe);
  //   });
  // }, [recipeId]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        const result = data.find(snack => snack.id === parseInt(recipeId));
        setRecipe(result);
      });
  }, []);

  return (
    <div className="font-dmsans pt-10 lg:pt-16 bg-customBackground dark:bg-zinc-950 w-full text-gray-800 dark:text-customBackground">
      {recipe && (
        <div className="p-10 md:px-40 md:py-20 flex flex-col gap-10">
          <h1 className="text-5xl md:text-6xl font-semibold">{recipe.title}</h1>
          <div className="flex justify-center">
            <img src={recipe.image} alt={recipe.title} />
          </div>
          <div className="flex gap-10">
            <div>
              <p className="text-sm text-gray-400">PREP TIME</p>
              <p className="text-lg">{recipe.prepTime} MIN</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">SERVINGS</p>
              <p className="text-lg">{recipe.servings} PEOPLE</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-10">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-semibold mb-5">Ingredients</h2>
              <ul className="list-disc list-inside">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={index} className="text-xl">{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-semibold mb-5">Instructions</h2>
              <p className="text-xl">{recipe.recipe.split("\n").map((step, index) => (
              <span key={index}>
                {step}
                <br />
              </span>
            ))}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;
