import PropTypes from "prop-types";

const FlipCard = ({ data, isFlipped, onClick }) => {
  const { title, comment, ingredients, recipe } = data;
  return (
    <div
      className="relative w-100 h-72 cursor-pointer perspective-1000 m-2"
      onClick={onClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* CardFront */}
        <div className="absolute w-full h-full backface-hidden bg-primaryColor text-secondaryColor flex justify-center items-center">
          <h2 className="text-4xl font-bold mb-2">{title}</h2>
        </div>

        {/* CardBack */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col justify-center items-center border border-primaryColor p-5">
          <p>{comment}</p>
          <button>Recipe</button>
        </div>
      </div>
    </div>
  );
};

FlipCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    comment: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    recipe: PropTypes.string,
  }).isRequired,
  isFlipped: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FlipCard;
