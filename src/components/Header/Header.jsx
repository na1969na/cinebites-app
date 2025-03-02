const Header = () => {
  return (
    <>
      <div className="pt-20 bg-seventhColor">
        <div className="text-primaryColor text-center">
          <div className="p-10">
            <h1 className="text-8xl mb-10 font-bold transform scale-x-110">
              Movies Meet <br />
              Perfect Dishes!
            </h1>
          </div>
        </div>
      </div>
      <div className="bg-fifthColor p-20 flex justify-center items-center flex-col">
        <p className="text-center mb-20 w-3/4">
          Start your journey with CineBites today and make every movie night
          unforgettable! <br />
          Get started now and discover the perfect recipe for your next movie
          night.
        </p>
        <div className="flex gap-5">
          <img src="/film_1.jpg" alt="Movie Image" className="w-1/3" />
          <img src="/film_2.jpg" alt="Movie Image" className="w-1/3" />
          <img src="/film_3.jpg" alt="Movie Image" className="w-1/3" />
        </div>
      </div>
      <div className="bg-secondaryColor p-20 flex justify-center items-center">
        <p className="w-3/4 text-center text-2xl">
          We believe in making your movie experience even more
          enjoyable by pairing films with delicious recipes. Our app is designed
          to connect your love for cinema with culinary inspiration, all in one
          place.
        </p>
      </div>
    </>
  );
};

export default Header;
