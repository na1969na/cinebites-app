import { Link } from 'react-router-dom';
import useMovieData from "../../hooks/useMovieData";

const MovieGenreDisplay = () => {
  const { genres } = useMovieData();

  return (
    <div className="p-12 font-publico">
      <h1 className="text-5xl text-gray-800 sm:text-7xl text-center p-10">
        Choose Your Genre
      </h1>
      <div className="grid grid-cols-3 gap-2 mt-10">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            className="p-6 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-300 cursor-pointer ease-in-out flex items-end h-40"
            to={{
              pathname: '/movies'
            }}
            state={{ genreId: genre.id, genreName: genre.name }}
          >
              <p className="text-left mb-2 text-3xl">{genre.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieGenreDisplay;
