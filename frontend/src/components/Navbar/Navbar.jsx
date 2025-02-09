import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="top-0 left-0 w-full z-50 bg-transparent fixed">
        <div className="text-xl md:text-3xl flex justify-center py-14">
          <Link to="/" className="-m-1.5">
            <div className="flex items-center">
              CineBites
              <img
                src="/cinebites_icon.svg"
                alt="CineBites Icon"
                className="ml-1 h-6 md:h-8 w-6 md:w-8"
              />
            </div>
          </Link>
        </div>
    </header>
  );
};

export default Navbar;
