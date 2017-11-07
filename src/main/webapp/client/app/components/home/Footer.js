import React from "react";

import MaterialButton from "../material-button";

export default props => (
  <footer className="home__footer">
    <MaterialButton
      className="material-button--green material-button--oval"
      delayRipple
      onClick={props.changePage}
      text="Go to about page via redux"
    />
    <MaterialButton
      className="material-button--red material-button--oval"
      delayRipple
      onClick={props.hello}
      text="Try API call"
    />
  </footer>
);
