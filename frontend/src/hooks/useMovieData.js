import { useState, useEffect } from 'react';
import axios from 'axios';

const useMovieData = (id) => {
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState('');
  const [movieDetails, setMovieDetails] = useState(null);
  const [director, setDirector] = useState(null);

  const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
  const MOVIES_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_API_KEY}&language=en-US&with_genres=${id}`;
  const GENRE_API_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${MOVIE_API_KEY}&language=en-US`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}&api_key=${MOVIE_API_KEY}`);
        setMovies(response.data.results || []);
        console.log(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchGenreName = async () => {
      try {
        const response = await axios.get(GENRE_API_URL);
        const genre = response.data.genres.find((genre) => genre.id.toString() === id);
        setGenreName(genre?.name || "Unknown Genre");
      } catch (error) {
        console.error("Error fetching genre name:", error);
      }
    };

    fetchMovies();
    fetchGenreName();
  }, [GENRE_API_URL, MOVIES_API_URL, id]);

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${MOVIE_API_KEY}&language=en-US`
      );
      setMovieDetails(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const fetchMovieCredits = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${MOVIE_API_KEY}&language=en-US`
      );
      const director = response.data.crew.find((member) => member.job === "Director");
      setDirector(director ? director.name : "Unknown Director");
    } catch (error) {
      console.error("Error fetching movie credits:", error);
    }
  };

  return {
    movies,
    genreName,
    movieDetails,
    director,
    fetchMovieDetails,
    fetchMovieCredits,
  };
};

export default useMovieData;