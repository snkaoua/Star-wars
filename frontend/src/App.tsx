// Import routing components from React Router v6:
// - Routes: container that holds all the <Route> definitions.
// - Route: maps a URL path to a React element (page component).
import { Routes, Route } from 'react-router-dom';

// Import the top navigation bar component.
import Navbar from './components/Navbar';

// Import page components that correspond to different routes.
// These names are aliases; internally each file exports a default component.
import Home from './pages/Home';
import About from './pages/About';
import Search from './pages/Search';
import Movies from './pages/Movies';

// Global CSS for layout, typography, pages, etc.
import './App.css';

// Favorites page (list of favorite characters).
import FavoritesPage from './pages/Favorites';

// Main application component.
// This is the root React component rendered by ReactDOM in main.tsx / index.tsx.
function App() {
  return (
    // Root wrapper for the entire app.
    // .app-root in CSS sets up a flex column layout with full viewport height,
    // so we can stick the footer to the bottom of the screen.
    <div className="app-root">
      {/* Navbar is shown on every page, because it’s outside <Routes>. */}
      <Navbar />

      {/* Main content area of the page (between header and footer).
          .app-main in CSS uses flex:1 so it expands and pushes the footer down. */}
      <main className="app-main">
        {/* Routes block defines all the possible screens for this SPA.
            React Router v6 uses <Routes> and the "element" prop on <Route>. */}
        <Routes>
          {/* Home route:
              - path="/" → root URL.
              - element={<Home />} → render the Home component. */}
          <Route path="/" element={<Home />} />

          {/* About route:
              - path="/about"
              - renders the About page (static text about Star Wars saga). */}
          <Route path="/about" element={<About />} />

          {/* Search route:
              - path="/search"
              - renders the Search page with character search, results, history, favorites star, etc. */}
          <Route path="/search" element={<Search />} />

          {/* Movies route:
              - path="/movies"
              - renders the MoviesPage showing the static table of movies + pills. */}
          <Route path="/movies" element={<Movies />} />

          {/* Favorites route:
              - path="/favorites"
              - renders the FavoritesPage which shows the list of saved characters
                (using localStorage via getFavorites/saveFavorites). */}
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>

      {/* Footer is also always visible, like the Navbar.
          .app-footer in CSS gives it a dark gradient, small font, and border-top. */}
      <footer className="app-footer">
        {/* Use JS expression to always show the current year dynamically.
            new Date().getFullYear() → e.g. 2025 */}
        <p>
          © {new Date().getFullYear()} Star Wars Fan Project · Data from SWAPI
        </p>
      </footer>
    </div>
  );
}

// Export the App component as the default export.
// This is the entry point that gets rendered by ReactDOM.
export default App;
