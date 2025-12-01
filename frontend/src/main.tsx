// Import React itself (needed for JSX and some dev tools)
import React from 'react';

// Import the ReactDOM client API for rendering into the real DOM.
// In React 18+, we use `createRoot` instead of `ReactDOM.render`.
import ReactDOM from 'react-dom/client';

// Import BrowserRouter from React Router.
// BrowserRouter handles client-side routing using the History API (clean URLs).
import { BrowserRouter } from 'react-router-dom';

// Import the main application component.
// This is the root component that contains Navbar, Routes, Footer, etc.
import App from './App.tsx';

// Import global CSS styles (fonts, body background, base styles, etc.).
import './index.css';

// Find the root HTML element in index.html (usually <div id="root"></div>).
// The non-null assertion operator (!) tells TypeScript:
// "I know this will not be null", so don't complain.
const rootElement = document.getElementById('root')!;

// Create a React root attached to that DOM element.
// This is the new API in React 18 (instead of ReactDOM.render).
ReactDOM.createRoot(rootElement).render(
  // <React.StrictMode> is a development-only helper:
  // - It activates additional checks and warnings.
  // - It may run some functions twice in dev to help find side-effect bugs.
  <React.StrictMode>
    {/* BrowserRouter wraps the entire app so that:
        - All components can use routing hooks (useNavigate, useParams, etc.).
        - <Routes> and <Route> in App.tsx work correctly.
        - URL changes are handled on the client side without full page reloads. */}
    <BrowserRouter>
      {/* Main application component */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
