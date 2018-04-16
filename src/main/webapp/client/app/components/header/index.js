import React from "react";
import Nav from "../nav";
import MaterialRipple from "../material-ripple";

import "./style.scss";

export default () => (
  <header className="header g-flex">
    <MaterialRipple to="/">
      <img
        alt="Carrefour"
        src="https://www.carrefouruae.com/_ui/responsive/theme-blue/images/logo.svg"
        width={150}
      />
    </MaterialRipple>
    <input
      className="header__search"
      type="text"
      placeholder="What are you looking for?"
    />
    <Nav />
  </header>
);
