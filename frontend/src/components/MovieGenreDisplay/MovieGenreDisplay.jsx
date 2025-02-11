import { Link } from "react-router-dom";
import useMovieData from "../../hooks/useMovieData";
import { useQuery } from "@tanstack/react-query";

const MovieGenreDisplay = () => {
  const { fetchGenres } = useMovieData();

  // Fetch genres
  const {
    data: genresData,
    isLoading: genresLoading,
    error: genresError,
  } = useQuery({ queryKey: ["genres"], queryFn: fetchGenres });
  const genres = genresData || [];

  return (
    <div className="py-12 px-20">
      <h1 className="text-xl sm:text-5xl md:text-3xl text-center text-black font-semibold">
        CHOOSE YOUR GENRE
      </h1>
      <p className="text-md text-center mb-8">
        Choose a genre, find matching films, and get delicious recipes to
        complement your cinematic journey.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4 py-10">
        {genres.map((genre) => (
          <div key={genre.id}>
            <Link
              className="flex text-6xl px-10 py-6 text-primaryColor hover:text-secondaryColor hover:bg-primaryColor transition duration-300 cursor-pointer ease-in-out border border-gray-800 rounded-full"
              to={{
                pathname: "/movie-recipe",
              }}
              state={{
                genreId: genre.id,
                genreName: genre.name,
              }}
            >
              {genre.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGenreDisplay;
