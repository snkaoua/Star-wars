// Main App component: builds the page layout (Navbar + main content + footer) 
// and defines all routes (URL -> page component).

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Search from "./pages/Search";
import Movies from "./pages/Movies";
import FavoritesPage from "./pages/Favorites";

import "./App.css";

function App() {
  return (
    <div className="app-root">
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Star Wars Fan Project · Data from SWAPI</p>
      </footer>
    </div>
  );
}

export default App;
