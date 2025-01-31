import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import useMovieData from "../../hooks/useMovieData";
import { useQuery } from "@tanstack/react-query";

const MovieGenreDisplay = () => {
  const { fetchGenres, fetchTopRatedMoviesByGenre } = useMovieData();

  // Fetch genres
  const {
    data: genresData,
    isLoading: genresLoading,
    error: genresError,
  } = useQuery({ queryKey: ["genres"], queryFn: fetchGenres });
  const genres = genresData || [];
  console.log(genres);

  // Fetch top-rated movies by genres ID
  const {
    data: topRatedMovies,
    isLoading: moviesLoading,
    error: moviesError,
  } = useQuery({
    queryKey: ["topRatedMovies", genres],
    queryFn: () => fetchTopRatedMoviesByGenre(genres),
    enabled: !!genres,
  });

  console.log(topRatedMovies);

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error fetching genres: {error.message}</p>;

  return (
    <div className="py-12 font-dmsans">
      <h1 className="text-xl sm:text-5xl md:text-5xl pb-5 font-bold text-center">
        Choose Your Genre
      </h1>
      <p className="text-lg text-center">
        Pair your favorite movie genres with the perfect recipes!
      </p>
      <p className="text-lg text-center mb-10">
        Explore films and enjoy a matching dish to elevate your movie night
        experience.{" "}
      </p>
      <div className="relative overflow-hidden pb-10">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth">
          {topRatedMovies &&
            Object.entries(topRatedMovies).map(([genre, movie]) => (
              <div key={movie.id}>
                <Link
                  className="flex text-center items-center py-5 text-3xl rounded-sm hover:opacity-75 transition duration-300 cursor-pointer ease-in-out gap-5"
                  to={{
                    pathname: "/movie-recipe",
                  }}
                  state={{
                    genreId: genre.id,
                    genreName: genre.name,
                  }}
                >
                  <h2 className="text-4xl font-semibold">{genre.name}</h2>
                  <ChevronRightIcon className="h-8 w-8" />
                </Link>
                <div className="min-w-[200px] lg:min-w-[250px] transition-transform duration-300 ease-in-out group">
                  <div className="w-full">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-auto rounded-3xl"
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieGenreDisplay;
