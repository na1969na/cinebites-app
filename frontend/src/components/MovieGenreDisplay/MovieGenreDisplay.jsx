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

  return (
    <div className="py-12 font-dmsans">
      <h1 className="text-xl sm:text-5xl md:text-5xl pb-5 text-center">
        Choose Your Genre
      </h1>
      <p className="text-xl text-center mb-8">
        Choose a genre, find matching films, and get delicious recipes to
        complement your cinematic journey.
      </p>
      <div className="">
        {genres.map((genre) => (
          <div key={genre.id}>
            <Link
              className="flex text-7xl items-center py-5 hover:text-primaryColor transition duration-300 cursor-pointer ease-in-out"
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
            <div className="relative overflow-hidden pb-10">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth">
                {topRatedMovies &&
                  topRatedMovies[genre.name]?.map((movie) => (
                    <div
                      key={movie.id}
                      className="min-w-[150px] lg:min-w-[200px] transition-transform duration-300 ease-in-out group"
                    >
                      <div className="w-full">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGenreDisplay;
