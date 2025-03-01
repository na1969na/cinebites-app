import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useMovieData from "../../hooks/useMovieData";

const Movie = () => {
  const location = useLocation();
  const { movie } = location.state || {};
  const { fetchDirector, fetchProvider } = useMovieData();

  // Fetch director
  const { data: director } = useQuery({
    queryKey: ["director", movie.id],
    queryFn: () => fetchDirector(movie.id),
    enabled: !!movie.id,
  });

  // Fetch provider
  const { data: providers } = useQuery({
    queryKey: ["provider", movie.id],
    queryFn: () => fetchProvider(movie.id),
    enabled: !!movie.id,
  });

  const renderProviderSection = (providersList, title) => {
    if (!providersList || providersList.length === 0) return null;

    return (
      <div className="mb-6">
        <h2 className="text-2xl mb-2">{title}</h2>
        <div className="flex flex-wrap gap-4">
          {providersList.map((provider) => (
            <div key={provider.provider_id} className="text-center">
              <p className="text-2xl mt-1">{provider.provider_name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="relative w-full h-[100vh]">
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

        <div className="absolute bottom-10 left-10 text-fifthColor text-8xl z-10">
          {movie.title}
        </div>
      </div>

      <div className="px-20 py-10">
        <div className="flex gap-10 pt-10 text-5xl">
          <div className="w-1/3">
            <h2 className="border-t border-black py-4 text-2xl">DIRECTED BY</h2>
            {director && <p className="pb-6">{director.name}</p>}
          </div>
          <div className="w-1/3">
            <h2 className="border-t border-black py-4 text-2xl ">YEAR</h2>
            <p className="pb-6">{new Date(movie.release_date).getFullYear()}</p>
          </div>
          <div className="w-1/3">
            <h2 className="border-t border-black py-4 text-2xl">RATE</h2>
            <div className="flex justify-between items-end">
              <p>
                {movie.vote_average.toFixed(1)}
                <span className="text-2xl"> /10</span>
              </p>
              <p className="text-2xl">{movie.vote_count} Ratings</p>
            </div>
          </div>
        </div>
        <p className="text-3xl border-t border-black py-4 my-20">
          {movie.overview}
        </p>
        <div className="border-t border-black py-4">
          {renderProviderSection(providers?.flatrate, "STREAM ...")}
          {renderProviderSection(providers?.buy, "BUY ...")}
          {renderProviderSection(providers?.rent, "RENT ...")}
          {providers && (
            <div className="mt-4">
              <a
                href={providers.link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-xl"
              >
                View on TMDb
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;
