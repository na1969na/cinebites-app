import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Recipe from "./pages/Recipe/Recipe";
import Layout from "./components/Layout/Layout";
import MovieRecipe from "./pages/MovieRecipe/MovieRecipe";
import Movies from "./pages/Movies/Movies";
import Recipes from "./pages/Recipes/Recipes";
import MyList from "./pages/MyList/MyList";
import Movie from "./pages/Movie/Movie";
import SearchResults from "./pages/SearchResults/SearchResults";

const App = () => {
  return (
    <div>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/movie-recipe" element={<MovieRecipe />} />
            <Route path="/recipe" element={<Recipe />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/movie" element={<Movie />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </Layout>
    </div>
  );
};

export default App;
