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

  // Fetch top-rated movies by genres ID
  const fetchTopRatedMoviesByGenre = async (genres) => {
    const movies = {};

    const requests = genres.map(async (genre) => {
      const response = await apiClient.get("/discover/movie", {
        params: {
          language: "en-US",
          sort_by: "vote_average.desc",
          "vote_count.gte": 1000,
          with_genres: genre.id,
        },
      });
      return { [genre.name]: response.data.results.slice(0, 10) };
    });

    // 全リクエスト完了後に結果をマージ
    const results = await Promise.all(requests);
    results.forEach((result) => Object.assign(movies, result));

    return movies;
  };

  // Fetch popular movies by genre ID
  const fetchPopularMoviesByGenre = async (id) => {
    try {
      const response = await apiClient.get("/discover/movie", {
        params: {
          language: "en-US",
          with_genres: id,
          sort_by: "popularity.desc",
          page: 1,
        },
      });
      console.log(response.data.results);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
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

  // 不要
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
    fetchTopRatedMoviesByGenre,
    fetchPopularMoviesByGenre,
    fetchImages,
    fetchVideos,
    fetchGenres,
    fetchDirector,
    fetchProvider,
  };
};

export default useMovieData;
