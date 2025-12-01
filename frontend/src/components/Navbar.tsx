// Importing Link and NavLink from react-router-dom
// - Link: used for simple navigation without "active" state
// - NavLink: like Link, but knows if the route is currently active and can style it accordingly
import { Link, NavLink } from 'react-router-dom';

// Import the CSS file that contains all the styles for this navbar
import './Navbar.css'; 

// Functional React component for the top navigation bar
function Navbar() {
  return (
    // <header> semantic HTML tag for the top section of the page (header area)
    <header className="sw-header">
      {/* Inner container that centers content and limits the width */}
      <div className="sw-header-inner">
        {/* 
          Logo on the left side.
          - "to='/'" means: when clicking the logo, go to the home page.
          - className "sw-logo" is styled in Navbar.css 
        */}
        <Link to="/" className="sw-logo">
          {/* 
            "Star" and "Hub" are in normal white,
            <span> around "Wars" is styled in yellow by .sw-logo span in CSS 
          */}
          Star<span>Wars</span> Hub
        </Link>

        {/* Navigation area on the right side of the header */}
        <nav className="sw-nav">
          {/* 
            NavLink for the Home page.
            - "to='/'" means this link represents the root path.
            - "end" means it will only be active on exactly "/" and not on subpaths like "/about".
            - className receives a function that gets an object { isActive } from React Router.
              If isActive === true → we return 'sw-nav-link active'
              If false → 'sw-nav-link'
              This matches your CSS: 
                .sw-nav-link { ... }   (base style)
                .sw-nav-link.active { ... }  (active state)
          */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'sw-nav-link active' : 'sw-nav-link'
            }
          >
            Home
          </NavLink>

          {/* 
            NavLink for the About page.
            - Will be active when the current route starts with "/about"
            - Uses the same className logic as Home to toggle the "active" class 
          */}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'sw-nav-link active' : 'sw-nav-link'
            }
          >
            About
          </NavLink>

          {/* 
            NavLink for the Search page.
            - Also uses the same pattern: if route is "/search", it gets the "active" class.
          */}
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? 'sw-nav-link active' : 'sw-nav-link'
            }
          >
            Search
          </NavLink>

          {/* 
            NavLink for the Favorites page.
            ⚠️ NOTE:
            Here you use:
               'sw-nav-link' + (isActive ? ' sw-nav-link-active' : '')
            but in your CSS you defined:
               .sw-nav-link.active { ... }
            So this link will never get the "active" style from CSS,
            because the class will be "sw-nav-link sw-nav-link-active",
            and there is no ".sw-nav-link-active" rule in the CSS file.

            If you want it to behave like the others, it should be:
              className={({ isActive }) =>
                isActive ? 'sw-nav-link active' : 'sw-nav-link'
              }

            Or you can add a separate CSS rule for ".sw-nav-link-active"
            if you want a different style just for Favorites.
          */}
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              'sw-nav-link' + (isActive ? ' sw-nav-link-active' : '')
            }
          >
            FAVORITES
          </NavLink>

          {/* 
            NavLink for the Movies page.
            - Same logic as the other standard links: if the route is "/movies",
              this link gets the "active" class and will be highlighted.
          */}
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive ? 'sw-nav-link active' : 'sw-nav-link'
            }
          >
            Movies
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

// Export the Navbar component so other files can import and use it
export default Navbar;
