import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Movie from "./pages/Movie/Movie";
import Recipe from "./pages/Recipe/Recipe";
import Layout from "./components/Layout/Layout";

const App = () => {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/recipe" element={<Recipe />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
