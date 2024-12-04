import { useState, useEffect } from "react";
import useMovieData from "../../hooks/useMovieData";

const About = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { fetchImages } = useMovieData();

  useEffect(() => {
    const imageMap = [
      { movieId: 398818, index: 9 },
      { movieId: 437586, index: 3 },
      { movieId: 13531, index: 1 },
      { movieId: 120467, index: 29 },
      { movieId: 16664, index: 17 },
    ];

    fetchImages(imageMap).then((fetchedImages) => {
      setImages(fetchedImages);
    });
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <div className="font-dmsans">
      <div
        className="bg-cover bg-center h-screen w-full relative"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative p-10 flex flex-col justify-center h-full">
          <h1 className="text-7xl sm:text-9xl font-publico text-white w-auto sm:static sm:top-auto sm:bottom-auto sm:transform-none absolute bottom-10 left-1/2 transform -translate-x-1/2 sm:translate-x-0">
            
            WHAT <br />
            IS
            <br />
            CineBites
          </h1>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 w-full p-10 dark:bg-zinc-900 dark:text-customBackground">
        <h2 className="text-3xl sm:text-6xl md:text-8xl font-helvetica w-full md:w-[40rem] ">
          Discover Movies, <br />
          Delight in Recipes
        </h2>
        <p className="text-lg md:text-2xl w-full md:w-[45rem]">
          At CineBites, we believe in making your movie experience even more
          enjoyable by pairing films with delicious recipes. Our app is designed
          to connect your love for cinema with culinary inspiration, all in one
          place.
        </p>
        <div className="w-[30rem] h-auto">
          {/* <img
              src="/src/assets/snack_1.jpg"
              alt=""
              className="w-full h-auto"
            /> */}
        </div>
      </div>
      <div className="flex flex-col md:flex-row-reverse gap-6 w-full p-10 bg-accentBackground">
        <h2 className="text-3xl sm:text-6xl md:text-8xl font-helvetica w-full md:w-[40rem] text-right">
          Why CineBites?
        </h2>
        <p className="text-lg md:text-2xl w-full md:w-[45rem]">
          We aim to transform the way you experience movies by adding a
          flavorful twist. CineBites is more than just an app – it’s a community
          for movie buffs and food lovers alike. Start your journey with
          CineBites today and make every movie night unforgettable! Get started
          now and discover the perfect recipe for your next movie night.
        </p>
        <div className="w-[30rem] h-auto">
          {/* <img
              src="/src/assets/snack_1.jpg"
              alt=""
              className="w-full h-auto"
            /> */}
        </div>
      </div>
    </div>
  );
};

export default About;
