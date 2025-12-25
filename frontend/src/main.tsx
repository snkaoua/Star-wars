// finds the #root element (div) in index.html and renders <App /> into it.
// Wraps the app with BrowserRouter to enable routing (URLs like /about, /movies) 
// and StrictMode for extra dev checks.

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root")!;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
