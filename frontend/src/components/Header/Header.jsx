import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <div
      className="relative isolate overflow-hidden h-screen text-center flex items-center justify-center"
      style={{
        backgroundImage: "url(/src/assets/header_img.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-30"></div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto">
          <h2 className="text-3xl font-publico text-white md:text-8xl">
            Pair Your Movie <br />
            with a Perfect Dish!
          </h2>
          <p className="mt-8 text-pretty font-dmsans text-gray-300 text-sm md:text-2xl">
            Discover the ultimate movie-watching experience! <br />
            Choose a genre, find matching films, and get delicious recipes{" "}
            <br />
            to complement your cinematic journey.
          </p>
        </div>
      </div>
      <ChevronDoubleDownIcon className="absolute bottom-10 right-10 hidden md:block md:h-16 md:w-16 text-white animate-bounce" />
    </div>
  );
};

export default Header;
