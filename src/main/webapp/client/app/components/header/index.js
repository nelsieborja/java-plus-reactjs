import React from "react";
import Nav from "../nav";

import "./style.scss";

export default () => (
  <header className="header g-flex">
    <img
      alt="Carrefour"
      src="https://www.carrefouruae.com/_ui/responsive/theme-blue/images/logo.svg"
      width={150}
    />
    <Nav />
  </header>
);
