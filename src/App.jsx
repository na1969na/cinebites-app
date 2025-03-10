import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import MovieRecipe from "./pages/MovieRecipe/MovieRecipe";
import Movie from "./pages/Movie/Movie";
import SearchResults from "./pages/SearchResults/SearchResults";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <div>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie-recipe" element={<MovieRecipe />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/search" element={<SearchResults />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
