const Navbar = () => {
  return (
    <header className="bg-customBackground sticky top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 font-publico text-3xl">
          <a href="#" className="-m-1.5">
            <div className="flex items-center">
              CineBites
              <img src="/cinebites_icon.svg" alt="CineBites Icon" className="ml-1 h-8 w-8" />
            </div>
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Sign in
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
