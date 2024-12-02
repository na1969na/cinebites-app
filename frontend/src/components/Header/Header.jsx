import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <div
      className="relative isolate overflow-hidden h-[calc(100vh-4rem)] text-center flex items-center justify-center"
      style={{
        backgroundImage: "url(/src/assets/header_img.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-30"></div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto">
          <h2 className="text-5xl font-publico text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Pair Your Movie <br />
            with a Perfect Dish!
          </h2>
          <p className="mt-8 text-pretty text-lg font-dmsans text-gray-300 sm:text-xl md:text-xl lg:text-2xl">
            Discover the ultimate movie-watching experience! <br />
            Choose a genre, find matching films, and get delicious recipes{" "}
            <br />
            to complement your cinematic journey.
          </p>
        </div>
      </div>
      <ChevronDoubleDownIcon className="absolute bottom-10 right-10 h-16 w-16 text-white animate-bounce" />
    </div>
  );
};

export default Header;
