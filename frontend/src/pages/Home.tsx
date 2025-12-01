// Import Link from react-router-dom
// Link is used instead of <a> so navigation happens on the client side
// without reloading the whole page.
import { Link } from 'react-router-dom';

// Functional React component that renders the Home page
function HomePage() {
  return (
    <>
      {/* 
        React Fragment <>...</>:
        - Lets us return multiple sibling elements (sections)
        - Without adding an extra wrapper <div> to the DOM 
      */}

      {/* HERO section at the top of the home page */}
      <section className="page-contained home-hero">
        {/* Small tagline text, usually above the main title */}
        <p className="home-tagline">
          A long time ago in a galaxy far, far away…
        </p>

        {/* 
          Main page title.
          - <span> around "Star Wars" lets you style that part differently
            in CSS (for example, change the color). 
        */}
        <h1 className="home-title">
          Explore the galaxy of <span>Star Wars</span>
        </h1>

        {/* 
          Subtitle text:
          - Explains what the app does in one or two sentences.
          - "home-subtitle" is a CSS class that likely controls font size,
            line-height, and max width. 
        */}
        <p className="home-subtitle">
          Search for iconic characters, learn about the saga movies and keep track
          of everything happening in the Star Wars universe – all in one simple fan app.
        </p>

        {/* 
          Container for the main call-to-action buttons on the hero section.
          Usually styled as a horizontal row with spacing between buttons.
        */}
        <div className="home-actions">
          {/* 
            First call-to-action:
            - Link to the /search route.
            - Inside the Link, a <button> styled as primary.
            - Clicking this will navigate to the Search page without reloading.
          */}
          <Link to="/search">
            <button className="sw-btn-primary">Start Searching</button>
          </Link>

          {/* 
            Second call-to-action:
            - Link to the /movies route.
            - Uses a "ghost" style button (outlined / secondary).
          */}
          <Link to="/movies">
            <button className="sw-btn-ghost">View Movies</button>
          </Link>
        </div>
      </section>

      {/* 
        Second section: cards under the hero.
        - Still wrapped in "page-contained" to align with the rest of the layout.
        - "home-grid" probably uses CSS grid or flexbox to arrange the cards.
      */}
      <section className="page-contained home-grid">
        {/* 
          First info card:
          - Highlights the character search feature of the app.
          - "home-card" class is probably a styled box with padding, shadow, etc.
        */}
        <div className="home-card">
          <h3>Character Search</h3>
          <p>
            Find quick info about classic heroes and villains using live data
            from SWAPI.
          </p>
        </div>

        {/* 
          Second info card:
          - Describes the movie timeline feature.
          - Explains that users can browse main saga + standalone movies.
        */}
        <div className="home-card">
          <h3>Movie Timeline</h3>
          <p>
            Browse the main saga episodes and standalone movies in a simple,
            chronological view.
          </p>
        </div>

        {/* 
          Third info card:
          - Talks about the tech stack and user experience:
            Node.js, Express, React → fast, responsive app.
        */}
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

// Export the HomePage component so it can be imported and used
// in the router (for the "/" route) or in other parts of the app.
export default HomePage;
