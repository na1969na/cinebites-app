const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold">CineBites</h2>
            <p className="text-gray-400">Pair your favorite movies with delicious recipes.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Home</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">About</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact</a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} CineBites. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
