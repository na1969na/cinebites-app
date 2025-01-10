import { Link } from "react-router-dom";
import useMovieData from "../../hooks/useMovieData";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const MovieGenreDisplay = () => {
  const { genres } = useMovieData();

  return (
    <div className="py-12 font-dmsans">
      <h1 className="text-xl sm:text-5xl md:text-3xl text-left pb-5">
        Choose Your Genre
      </h1>
      <div className="">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            className="flex text-center items-center p-5 text-3xl rounded-sm hover:opacity-75 transition duration-300 cursor-pointer ease-in-out gap-5"
            to={{
              pathname: "/movie-recipe",
            }}
            state={{
              genreId: genre.id,
              genreName: genre.name,
            }}
          >
            <h2 className="text-3xl">{genre.name}</h2>
            <ChevronRightIcon class="h-6 w-6" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieGenreDisplay;
