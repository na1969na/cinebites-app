import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useMovieData from "../../hooks/useMovieData";

const Movie = () => {
  const location = useLocation();
  const { movie } = location.state || {};
  const { fetchDirector } = useMovieData();

  // Fetch director
  const { data: director } = useQuery({
    queryKey: ["director", movie.id],
    queryFn: () => fetchDirector(movie.id),
    enabled: !!movie.id,
  });

  return (
    <div className="font-mori">
      <div className="relative w-full h-[80vh]">
        {movie.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-white text-xl">No image</p>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>

        <div className="absolute bottom-10 left-10 text-white text-7xl font-bold z-10">
          {movie.title}
        </div>
      </div>

      <div className="px-20 py-10">
        <div className="flex my-20 px-10 justify-between gap-10">
          <div className="text-4xl w-1/3">
            <p className="border-t border-primaryColor py-4 text-2xl text-primaryColor">
              DIRECTED BY
            </p>
            {director && <p className="pb-6">{director.name}</p>}

            <p className="border-t border-primaryColor py-4 text-2xl text-primaryColor">
              YEAR
            </p>
            <p className="pb-6">{new Date(movie.release_date).getFullYear()}</p>

            <p className="border-t border-primaryColor py-4 text-2xl text-primaryColor">
              RATE
            </p>
            <p className="pb-1">
              {movie.vote_average.toFixed(1)}
              <span className="text-2xl"> /10</span>
            </p>
            <p className="text-2xl">{movie.vote_count} Ratings</p>
          </div>
          <p className="text-3xl px-10 w-1/2 text-primaryColor">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
