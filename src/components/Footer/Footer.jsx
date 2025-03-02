const Footer = () => {
  return (
    <footer className="py-12 bg-black text-fifthColor">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex lg:flex-1 text-3xl">
              <div className="flex items-center font-semibold">
                CineBites
              </div>
            </div>
          </div>
          <div>
            &copy; {new Date().getFullYear()} CineBites. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
