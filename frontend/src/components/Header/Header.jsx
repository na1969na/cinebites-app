const Header = () => {
  return (
    <>
      <div className="pt-20 bg-black font-helvetica">
        <div className="text-white ">
          <div className="p-10">
            <h1 className="text-8xl mb-10">
              Movies Meet <br />
              Perfect Dishes
            </h1>
          </div>
          <img src="/CineBites.svg" alt="CineBites Title" />
        </div>
      </div>
      <div className="bg-fifthColor p-20">
        <p className="text-center mb-20">
          We aim to transform the way you experience movies by adding a
          flavorful twist. Start your journey with CineBites today and make
          every movie night unforgettable! Get started now and discover the
          perfect recipe for your next movie night.
        </p>
        <div className="flex gap-5">
          <img src="/film_1.jpg" alt="CineBites Title" className="w-1/3" />
          <img src="/film_2.jpg" alt="CineBites Title" className="w-1/3" />
          <img src="/film_3.jpg" alt="CineBites Title" className="w-1/3" />
        </div>
      </div>
      <div className="bg-secondaryColor p-20"> 
        <p> 
          At CineBites, we believe in making your movie experience even more
          enjoyable by pairing films with delicious recipes. Our app is designed
          to connect your love for cinema with culinary inspiration, all in one
          place.
        </p>
      </div>
    </>
  );
};

export default Header;
