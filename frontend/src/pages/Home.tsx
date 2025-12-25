// HomePage component: renders the landing page with a hero section,
// quick navigation buttons to Search/Movies, and a feature grid describing what the app offers.

import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <section className="page-contained home-hero">
        <p className="home-tagline">
          A long time ago in a galaxy far, far away…
        </p>

        
        <h1 className="home-title">
          Explore the galaxy of <span>Star Wars</span>
        </h1>

        
        <p className="home-subtitle">
          Search for iconic characters, learn about the saga movies and keep track
          of everything happening in the Star Wars universe – all in one simple fan app.
        </p>

        
        <div className="home-actions">
          
          <Link to="/search">
            <button className="sw-btn-primary">Start Searching</button>
          </Link>

          
          <Link to="/movies">
            <button className="sw-btn-ghost">View Movies</button>
          </Link>
        </div>
      </section>

     
      <section className="page-contained home-grid">
        
        
        <div className="home-card">
          <h3>Character Search</h3>
          <p>
            Find quick info about classic heroes and villains using live data
            from SWAPI.
          </p>
        </div>

        <div className="home-card">
          <h3>Movie Timeline</h3>
          <p>
            Browse the main saga episodes and standalone movies in a simple,
            chronological view.
          </p>
        </div>

        <div className="home-card">
          <h3>Simple &amp; Fast</h3>
          <p>
            Built with Node.js, Express and React so everything feels light,
            responsive and fun to use.
          </p>
        </div>
      </section>
    </>
  );
}

export default HomePage;
 