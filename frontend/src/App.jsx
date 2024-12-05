import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Movie from "./pages/Movie/Movie";
import Recipe from "./pages/Recipe/Recipe";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/recipe" element={<Recipe />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
