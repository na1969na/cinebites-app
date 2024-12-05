import { Link } from "react-router-dom";
import useMovieData from "../../hooks/useMovieData";

const MovieGenreDisplay = () => {
  const { genres } = useMovieData();
  const getBackgroundColor = (genreId) => {
    switch (genreId) {
      case 28: // Action
        return 'bg-[linear-gradient(90deg,rgba(248,57,57,1),rgba(97,64,48,1))]';
      case 12: // Adventure
        return 'bg-[linear-gradient(90deg,_rgba(248,134,57,1),_rgba(97,48,48,1))]';
      case 16: // Animation
        return 'bg-[linear-gradient(90deg,rgba(255,203,0,1),rgba(97,64,48,1))]';
      case 35: // Comedy
        return 'bg-[linear-gradient(90deg,rgba(212,248,57,1),rgba(97,64,48,1))]';
      case 80: // Crime
        return 'bg-[linear-gradient(90deg,rgba(150,255,0,1),rgba(97,64,48,1))]';
      case 99: // Documentary
        return 'bg-[linear-gradient(90deg,rgba(0,255,72,1),rgba(97,64,48,1))]';
      case 18: // Drama
        return 'bg-[linear-gradient(90deg,rgba(1,255,187,1),rgba(97,64,48,1))]';
      case 10751: // Family
        return 'bg-[linear-gradient(90deg,rgba(1,231,255,1),rgba(97,64,48,1))]';
      case 14: // Fantasy
        return 'bg-[linear-gradient(90deg,rgba(57,248,170,1),rgba(97,48,48,1))]';
      case 36: // History
        return 'bg-[linear-gradient(90deg,rgba(1,96,255,1),rgba(97,64,48,1))]';
      case 27: // Horror
        return 'bg-[linear-gradient(90deg,rgba(14,1,255,1),rgba(97,64,48,1))]';
      case 10402: // Music
        return 'bg-[linear-gradient(90deg,rgba(127,1,255,1),rgba(97,64,48,1))]';
      case 9648: // Mystery
        return 'bg-[linear-gradient(90deg,rgba(201,0,250,1),rgba(97,48,48,1))]';
      case 10749: // Romance
        return 'bg-[linear-gradient(90deg,rgba(205,1,255,1),rgba(97,64,48,1))]';
      case 878: // Science Fiction
        return 'bg-[linear-gradient(90deg,rgba(250,0,187,1),rgba(97,48,48,1))]';
      case 10770: // TV Movie
        return 'bg-[linear-gradient(90deg,rgba(255,1,191,1),rgba(97,64,48,1))]';
      case 53: // Thriller
        return 'bg-[linear-gradient(90deg,rgba(255,1,106,1),rgba(97,64,48,1))]';
      case 10752: // War
        return 'bg-[linear-gradient(90deg,rgba(250,0,103,1),rgba(97,48,48,1))]';
      case 37: // Western
        return 'bg-[linear-gradient(90deg,rgba(255,1,13,1),rgba(97,64,48,1))]';
      default:
        return 'bg-gray-800';
    }
  };

  return (
    <div className="p-12 font-publico bg-zinc-900">
      <h1 className="text-3xl text-white sm:text-5xl md:text-7xl text-center p-0 sm:p-5 md:p-10">
        Choose Your Genre
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 place-items-center max-w-screen-lg mx-auto">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            className={`p-6 text-customBackground rounded-full shadow-md hover:bg-opacity-75 transition duration-300 cursor-pointer ease-in-out flex items-center justify-center h-60 w-60 ${getBackgroundColor(genre.id)}`}
            to={{
              pathname: "/movies",
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
