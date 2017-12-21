import React from "react";
import { render } from "react-dom";
import Provider from "./components/Provider";

if (process.env.APP_ENV === "development") {
  const { whyDidYouUpdate } = require("why-did-you-update");
  whyDidYouUpdate(React);
}

const rootEl = document.querySelector("#root");
render(<Provider />, rootEl);

// window.renderOnClient = function () {
//   render(<Provider />, rootEl);
// };

// window.renderOnServer = function () {
//   return React.renderToString(<Provider />);
// };

if (module.hot) {
  module.hot.accept("./components/Provider", () => {
    const NextProvider = require("./components/Provider").default;
    render(<NextProvider />, rootEl);
  });
}
