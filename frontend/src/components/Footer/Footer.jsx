const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 font-dmsans">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex lg:flex-1 font-publico text-3xl">
              <div className="flex items-center">
                CineBites
                <img
                  src="/cinebites_icon.svg"
                  alt="CineBites Icon"
                  className="ml-1 h-8 w-8"
                />
              </div>
            </div>
            <p className="text-gray-400">
              Pair your favorite movies with delicious recipes.
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="/"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              About
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} CineBites. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
