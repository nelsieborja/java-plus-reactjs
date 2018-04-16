import React from "react";
import { Translate } from "react-translated";
import MaterialRipple from "../material-ripple";

import "./style.scss";

export default () => (
  <nav className="nav">
    <MaterialRipple
      smallRipple
      className="nav__item"
      text={<Translate text="About" />}
      to="/about"
    />
    <MaterialRipple
      smallRipple
      className="nav__item"
      text={<Translate text="Not Found" />}
      to="not-found"
    />
  </nav>
);
