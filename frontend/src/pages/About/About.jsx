const About = () => {
  return (
    <div className="bg-black text-primaryColor px-20">
      <div className="flex w-full pt-20 justify-center">
        <img
          src="/CineBites_image.svg"
          alt="CineBites Title"
          className="h-96"
        />
      </div>
      <div className="py-20 text-secondaryColor">
        <h2 className="text-3xl sm:text-8xl mb-20 font-semibold">
          Discover Movies,
          <br />
          Delight in Recipes
        </h2>
        <p className="text-lg md:text-2xl max-w-4xl">
          At CineBites, we believe in making your movie experience even more
          enjoyable by pairing films with delicious recipes. Our app is designed
          to connect your love for cinema with culinary inspiration, all in one
          place.
        </p>
      </div>
      <div className="flex justify-center gap-5">
        <img src="/Image.jpg" alt="CineBites Title" className="w-28" />
        <img src="/food_image_2.jpg" alt="CineBites Title" className="w-28" />
        <img src="/Image.jpg" alt="CineBites Title" className="w-28" />
        <img src="/Image.jpg" alt="CineBites Title" className="w-28" />
        <img src="/Image.jpg" alt="CineBites Title" className="w-28" />
        <img src="/Image.jpg" alt="CineBites Title" className="w-28" />
      </div>
      <div className="py-20 text-tertiaryColor ">
        <h2 className="text-3xl sm:text-8xl mb-20 font-semibold text-right">
          Why CineBites?
        </h2>
        <p className="text-lg md:text-2xl text-right max-w-2xl ml-auto">
          We aim to transform the way you experience movies by adding a
          flavorful twist. Start your journey with CineBites today and make
          every movie night unforgettable! Get started now and discover the
          perfect recipe for your next movie night.
        </p>
      </div>
      <div className="flex gap-5">
        <img src="/film_1.jpg" alt="CineBites Title" className="w-1/3" />
        <img src="/film_2.jpg" alt="CineBites Title" className="w-1/3" />
        <img src="/film_3.jpg" alt="CineBites Title" className="w-1/3" />
      </div>
    </div>
  );
};

export default About;
