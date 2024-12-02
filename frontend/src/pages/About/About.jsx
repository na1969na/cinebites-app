import axios from "axios";
import { useState, useEffect } from "react";

const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const MOVIE_IMAGE_MAP = [
  { movieId: 27205, index: 12 },
  { movieId: 437586, index: 3 },
  { movieId: 39210, index: 4 },
  { movieId: 542178, index: 22 },
];

const About = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages = [];

      try {
        for (const { movieId, index } of MOVIE_IMAGE_MAP) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${MOVIE_API_KEY}`
          );
          const backdrops = response.data.backdrops;
          const selectedImage = backdrops[index];
          console.log(backdrops);
          if (selectedImage) {
            fetchedImages.push(
              `${TMDB_IMAGE_BASE_URL}${selectedImage.file_path}`
            );
          } else {
            console.warn(
              `Image at index ${index} not found for movie ID: ${movieId}`
            );
          }
        }

        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="font-dmsans">
      <div className="">
        <div
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "70vh",
            width: "100%",
          }}
        >
          <div className="p-10">
            <h1 className="text-9xl font-publico">
              WHAT <br />
              IS
              <br />
              CineBites
            </h1>
          </div>
        </div>
        <div className="flex gap-6 w-50 p-10">
          <div className="flex-row w-1/2">
            <h2 className="text-4xl font-publico">
              Discover Movies, Delight in Recipes
            </h2>
            <p>
              At CineBites, we believe in making your movie experience even more
              enjoyable by pairing films with delicious recipes. Our app is
              designed to connect your love for cinema with culinary
              inspiration, all in one place.
            </p>
          </div>
          <div>
            <img src="/src/assets/snack_1.jpg" alt="" />
          </div>
        </div>
      </div>
      <div className="bg-accentBackground p-10">
        <div className="flex-row gap-6 text-right">
          <h2 className="text-4xl font-publico">Why CineBites?</h2>
          <p>
            We aim to transform the way you experience movies by adding a
            flavorful twist. CineBites is more than just an app – it’s a
            community for movie buffs and food lovers alike. Start your journey
            with CineBites today and make every movie night unforgettable! Get
            started now and discover the perfect recipe for your next movie
            night.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
