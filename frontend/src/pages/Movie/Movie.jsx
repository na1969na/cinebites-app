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
        <h2 className="text-2xl mb-2 text-primaryColor">{title}</h2>
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
            <h2 className="border-t border-primaryColor py-4 text-2xl text-primaryColor">
              DIRECTED BY
            </h2>
            {director && <p className="pb-6">{director.name}</p>}

            <h2 className="border-t border-primaryColor py-4 text-2xl text-primaryColor">
              YEAR
            </h2>
            <p className="pb-6">{new Date(movie.release_date).getFullYear()}</p>

            <h2 className="border-t border-primaryColor py-4 text-2xl text-primaryColor">
              RATE
            </h2>
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
        <div className="px-10">
          <div className="border-t border-primaryColor py-4">
            {renderProviderSection(providers?.flatrate, "STREAM")}
            {renderProviderSection(providers?.buy, "BUY")}
            {renderProviderSection(providers?.rent, "RENT")}
            {providers && (
              <div className="mt-4">
                <a
                  href={providers.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-primaryColor text-xl"
                >
                  View on TMDb
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
