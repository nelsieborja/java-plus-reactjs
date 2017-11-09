import React from "react";
import Nav from "../nav";

import "./style.scss";

export default () => (
  <header className="header g-flex">
    <img
      alt="Google"
      src="https://www.google.ae/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png"
      width={120}
    />
    <Nav />
  </header>
);
