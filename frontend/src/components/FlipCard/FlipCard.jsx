import PropTypes from "prop-types";

const FlipCard = ({ data, isFlipped, onClick }) => {
  const { title, comment } = data;
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
        <div className="absolute w-full h-full backface-hidden bg-sixthColor flex items-center rounded-sm p-5">
          <h2 className="text-6xl">{title}</h2>
        </div>

        {/* CardBack */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col justify-center items-center bg-fifthColor border border-sixthColor p-10">
          <p>{comment}</p>
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
