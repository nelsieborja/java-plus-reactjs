import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "./home";
import About from "./about";

import "./scss/style.scss";

export default () => (
  <div>
    <nav className="nav">
      <Link to="/" className="nav__item">
        Home
      </Link>
      <Link to="/about-us" className="nav__item">
        About
      </Link>
    </nav>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
    </main>
  </div>
);
