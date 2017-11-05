import React from "react";
import { render } from "react-dom";
import Root from "./containers/Root";

const rootEl = document.querySelector("#root");

render(<Root />, rootEl);

if (module.hot) {
  module.hot.accept("./containers/Root", () => {
    const NextRoot = require("./containers/Root").default;
    render(<NextRoot />, rootEl);
  });
}
