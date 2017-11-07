import React from "react";
import { render } from "react-dom";
import Provider from "./components/Provider";

const rootEl = document.querySelector("#root");

render(<Provider />, rootEl);

if (module.hot) {
  module.hot.accept("./components/Provider", () => {
    const NextProvider = require("./components/Provider").default;
    render(<NextProvider />, rootEl);
  });
}
