import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="top-0 left-0 w-full z-50 text-zinc-950 bg-customBackground fixed">
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-3 px-4 lg:px-4 h-[3rem] md:h-[4rem]">
        <div className="font-publico text-xl md:text-3xl">
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
        <div className="flex flex-row items-center md:gap-6">
          <ul className="flex space-x-10">
            <li>
              <Link
                to="/about"
                className="text-lg transform transition-transform duration-300 hover:rotate-6"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/user"
                className="text-lg transform transition-transform duration-300 hover:rotate-6"
              >
                User
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className="text-lg transform transition-transform duration-300 hover:rotate-6"
              >
                Post
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
