import { Link } from "react-router-dom";
import useMovieData from "../../hooks/useMovieData";
import { useQuery } from "@tanstack/react-query";

const MovieGenreDisplay = () => {
  const { fetchGenres } = useMovieData();
  const colors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500"];

  // Fetch genres
  const {
    data: genresData,
    isLoading: genresLoading,
    error: genresError,
  } = useQuery({ queryKey: ["genres"], queryFn: fetchGenres });
  const genres = genresData || [];

  return (
    <div className="py-12 px-20 bg-fifthColor">
      <h1 className="text-xl sm:text-5xl md:text-3xl text-center text-black font-semibold">
        CHOOSE YOUR GENRE
      </h1>
      <p className="text-md text-center mb-8">
        Choose a genre, find matching films, and get delicious recipes to
        complement your cinematic journey.
      </p>
      <div className="py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 px-5 py-10">
          {genres.map((genre) => (
            <div key={genre.id}>
              <Link
                className="flex justify-center text-4xl py-3 cursor-pointer border-2 border-black rounded-full hover:bg-black hover:text-fifthColor"
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
    </div>
  );
};

export default MovieGenreDisplay;
