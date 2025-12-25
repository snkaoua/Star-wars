// Navbar component: shows the top header with a logo link and navigation links.
// Uses NavLink to automatically add an "active" style to the link of the current page.

import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'; 

function Navbar() {
  return (
    <header className="sw-header">
      <div className="sw-header-inner">
  
        <Link to="/" className="sw-logo">
          Star<span>Wars</span> Hub
        </Link>

        <nav className="sw-nav">
          
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'sw-nav-link active' : 'sw-nav-link'
            }
          >
            Home
          </NavLink>

          
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'sw-nav-link active' : 'sw-nav-link'
            }
          >
            About
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? 'sw-nav-link active' : 'sw-nav-link'
            }
          >
            Search
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              'sw-nav-link' + (isActive ? ' sw-nav-link-active' : '')
            }
          >
            FAVORITES
          </NavLink>

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

export default Navbar;
