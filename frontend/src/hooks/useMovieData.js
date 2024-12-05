import { useState, useEffect } from "react";
import axios from "axios";

const useMovieData = (id) => {
  const [genres, setGenres] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);

  const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

  // Create an Axios instance
  const apiClient = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MOVIE_API_KEY}`,
    },
  });

  // Fetch movies by genre ID
  const fetchMovies = async () => {
    try {
      const response = await apiClient.get("/discover/movie", {
        params: {
          language: "en-US",
          page: 1,
          with_genres: id,
          sort_by: "popularity.desc",
        },
      });
      console.log(response.data.results);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await apiClient.get("/genre/movie/list", {
          params: {
            language: "en-US",
          },
        });
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, [id]);

  // Fetch movie details by movie ID
  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await apiClient.get(`/movie/${movieId}`, {
        params: {
          language: "en-US",
        },
      });
      setMovieDetails(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  // Fetch images for the About page
  const fetchImages = async (imageMap) => {
    try {
      const images = [];
      for (const { movieId, index } of imageMap) {
        const response = await apiClient.get(`/movie/${movieId}/images`);
        const backdrops = response.data.backdrops;
        const selectedImage = backdrops[index];
        if (selectedImage) {
          images.push(
            `https://image.tmdb.org/t/p/original${selectedImage.file_path}`
          );
        } else {
          console.warn(`No backdrops found for movie ID: ${movieId}`);
        }
      }
      return images;
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return {
    genres,
    movieDetails,
    fetchMovies,
    fetchMovieDetails,
    fetchImages,
  };
};

export default useMovieData;
