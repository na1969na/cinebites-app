import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const API_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${MOVIE_API_KEY}&language=en-US`;

const MovieGenreDisplay = () => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(API_URL);
        setGenres(response.data.genres);
        console.log("Genres fetched:", response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="p-12 font-publico">
      <h1 className="text-5xl text-gray-800 sm:text-7xl text-center p-10">
        Choose Your Genre
      </h1>
      <div className="grid grid-cols-3 gap-2 mt-10">
        {genres.map((genre) => (
          <div
            key={genre.id}
            className="p-6 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-300 ease-in-out flex items-end h-40"
            style={{ cursor: "pointer" }}
            onClick={() => handleGenreClick(genre.id)}
          >
              <p className="text-left mb-2 text-3xl">{genre.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGenreDisplay;
