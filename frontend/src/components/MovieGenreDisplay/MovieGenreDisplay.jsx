import { useEffect, useState } from "react";
import axios from "axios";
import MovieRecipeDisplay from "../MovieRecipeDisplay/MovieRecipeDisplay";

const MovieGenreDisplay = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const API_KEY = "e03fe03a5210e4c47d6d31c407ec7dcd";
  const API_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

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

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre); 
  };

  if (selectedGenre) {
    return <MovieRecipeDisplay genre={selectedGenre} />;
  }

  return (
    <div className="p-10 font-publico">
      <h1 className="text-5xl sm:text-7xl text-center p-10">
        Choose Your Genre
      </h1>
      <div className="grid grid-cols-4 gap-2 mt-10">
        {genres.map((genre) => (
          <div
            key={genre.id}
            className="p-6 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-300 ease-in-out flex items-end h-40" onClick={() => handleGenreClick(genre)} style={{ cursor: "pointer" }}
          >
            <p className="text-left mb-2 text-3xl">{genre.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGenreDisplay;
