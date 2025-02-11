import axios from "axios";

const useMovieData = () => {
  const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

  // Create an Axios instance
  const apiClient = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MOVIE_API_KEY}`,
    },
  });

  // Fetch genres
  const fetchGenres = async () => {
    const response = await apiClient.get("/genre/movie/list", {
      params: {
        language: "en-US",
      },
    });
    return response.data.genres;
  };

  // Fetch popular movies by genre ID
  const fetchPopularMoviesByGenre = async (id) => {
    const response = await apiClient.get("/discover/movie", {
      params: {
        language: "en-US",
        with_genres: id,
        sort_by: "popularity.desc",
        page: 1,
      },
    });
    return response.data.results;
  };

  // Fetch videos by movie ID
  const fetchVideos = async (movieId) => {
    try {
      const response = await apiClient.get(`/movie/${movieId}/videos`);
      const videos = response.data.results;
      const filteredVideos = videos.filter(
        (video) =>
          video.official === true &&
          video.site === "YouTube" &&
          video.type === "Teaser"
      );

      const latestVideo = filteredVideos.reduce((latest, current) => {
        const latestDate = new Date(latest.published_at);
        const currentDate = new Date(current.published_at);
        return currentDate > latestDate ? current : latest;
      }, filteredVideos[0]);

      return latestVideo;
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // Fetch director by movie ID
  const fetchDirector = async (movieId) => {
    const response = await apiClient.get(`/movie/${movieId}/credits`, {
      params: {
        language: "en-US",
      },
    });
    const crew = response.data.crew;
    const director = crew.find((member) => member.job === "Director");
    return director;
  };

  // Fetch provider by movie ID
  const fetchProvider = async (movieId) => {
    const response = await apiClient.get(`/movie/${movieId}/watch/providers`);
    const providers = response.data.results.CA;
    return providers;
  };

  // Fetch movie by keyword
  const fetchMovies = async (query) => {
    const response = await apiClient.get("/search/movie", {
      params: {
        query,
        language: "en-US",
      },
    });
    return response.data.results;
  };

  return {
    fetchPopularMoviesByGenre,
    fetchVideos,
    fetchGenres,
    fetchDirector,
    fetchProvider,
    fetchMovies,
  };
};

export default useMovieData;
