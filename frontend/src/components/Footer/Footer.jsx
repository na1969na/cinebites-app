import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex lg:flex-1 text-3xl">
              <div className="flex items-center">
                CineBites
                <img
                  src="/cinebites_icon.svg"
                  alt="CineBites Icon"
                  className="ml-1 h-8 w-8"
                />
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/"
              className="border border-black rounded-full py-1 px-6 hover:bg-black hover:text-gray-300"
            >
              <div className="flex items-center">Home</div>
            </Link>
            <Link
              to="/about"
              className="border border-black rounded-full py-1 px-6 hover:bg-black hover:text-gray-300"
            >
              <div className="flex items-center">About</div>
            </Link>
          </div>
          <div className="">
            &copy; {new Date().getFullYear()} CineBites. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
