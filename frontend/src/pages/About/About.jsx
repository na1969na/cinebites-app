const About = () => {
  return (
    <div>
      <div className="relative w-full h-[80vh]">
        <img
          src="/about_image.png"
          alt="Cinema seats"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-[80h] bg-black/30"></div>

      <div className="absolute top-20 left-10 text-white text-8xl font-bold z-10">
        CINEBITES
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full px-20 py-20 bg-white">
        <h2 className="text-3xl sm:text-6xl md:text-8xl font-helvetica w-full">
          Discover Movies, <br />
          Delight in Recipes
        </h2>
        <p className="text-lg md:text-2xl w-full md:w-[45rem]">
          At CineBites, we believe in making your movie experience even more
          enjoyable by pairing films with delicious recipes. Our app is designed
          to connect your love for cinema with culinary inspiration, all in one
          place.
        </p>
      </div>
      <div className="flex flex-col md:flex-row-reverse gap-10 w-full px-20 py-20 bg-white mt-10">
        <h2 className="text-3xl sm:text-6xl md:text-8xl font-helvetica w-full md:w-[40rem] text-right">
          Why CineBites?
        </h2>
        <p className="text-lg md:text-2xl w-full md:w-[45rem] ">
          We aim to transform the way you experience movies by adding a
          flavorful twist. CineBites is more than just an app – it’s a community
          for movie buffs and food lovers alike. Start your journey with
          CineBites today and make every movie night unforgettable! Get started
          now and discover the perfect recipe for your next movie night.
        </p>
      </div>
    </div>
  );
};

export default About;
