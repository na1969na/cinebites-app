import PropTypes from "prop-types";

const FlipCard = ({ data, isFlipped, onClick }) => {  
  const { snackName, ingredients, recipe } = data;
  return (
    <div
      className="relative cursor-pointer perspective-1000 m-2 aspect-square"
      onClick={onClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* CardFront */}
        <div className="absolute w-full h-full backface-hidden text-primaryColor bg-seventhColor flex items-center rounded-sm p-5">
          <h2 className="text-6xl">{snackName}</h2>
        </div>

        {/* CardBack */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col bg-primaryColor border border-seventhColor p-10">
          <h3 className="text-2xl">Ingredients:</h3>
          <p>{ingredients.join(", ")}</p>
          <h3 className="text-2xl mt-4">Recipe:</h3>
          <ol className="list-inside">
            {recipe.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

FlipCard.propTypes = {
  data: PropTypes.shape({
    snackName: PropTypes.string,
    description: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    recipe: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isFlipped: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FlipCard;
