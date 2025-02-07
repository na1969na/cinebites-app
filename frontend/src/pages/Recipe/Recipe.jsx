import { useState, useEffect } from "react";
import useRecipeData from "../../hooks/useRecipeData";
import { useLocation } from "react-router-dom";

const Recipe = () => {
  const [recipe, setRecipe] = useState(null);
  const { fetchRecipeDetails } = useRecipeData();
  const location = useLocation();
  const { recipeId } = location.state || {};

  // useEffect(() => {
  //   fetchRecipeDetails(recipeId).then((recipe) => {
  //     setRecipe(recipe);
  //     console.log(recipe);
  //   });
  // }, [recipeId]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const result = data.find((snack) => snack.id === parseInt(recipeId));
        setRecipe(result);
      });
  }, []);

  return (
    <div className="font-mori pt-10 lg:pt-16 w-full text-black">
      <div className="px-20 py-10">
        {recipe && (
          <div>
            <div className="flex mb-10 h-screen border-b border-black">
              <div className="flex-1 text-center m-auto">
                <h1 className="text-5xl md:text-5xl">
                  {recipe.title}
                </h1>
                <p className="px-10">{recipe.comment}</p>
              </div>
              <div className="flex-1 justify-center mb-10">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="h-full object-cover rounded-sm"
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-10">
              <div className="flex gap-10">
                <div>
                  <p className="text-sm">PREP TIME</p>
                  <p className="text-lg">{recipe.prepTime} MIN</p>
                </div>
                <div>
                  <p className="text-sm ">SERVINGS</p>
                  <p className="text-lg">{recipe.servings} PEOPLE</p>
                </div>
              </div>
              <div className="w-1/2">
                <div className="mb-10">
                  <h2 className="text-xl mb-5">Ingredients:</h2>
                  <ul className="list-disc list-inside space-y-3">
                    {recipe.ingredients?.map((ingredient, index) => (
                      <li key={index} className="text-xl">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10">
                  <h2 className="text-xl mb-5">Steps:</h2>
                  <p className="text-xl">
                    {recipe.recipe.split("\n").map((step, index) => (
                      <span key={index} className="block mb-4">
                        {step}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipe;
