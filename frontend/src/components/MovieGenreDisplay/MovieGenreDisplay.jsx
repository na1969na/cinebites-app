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
      <div className="py-10">
        {genres.map((genre) => (
          <div key={genre.id}>
            <Link
              className="flex text-4xl px-10 py-3 text-primaryColor hover:pb-10 transition duration-300 cursor-pointer ease-in-out border-2 border-b-0 border-black rounded-t-2xl"
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
