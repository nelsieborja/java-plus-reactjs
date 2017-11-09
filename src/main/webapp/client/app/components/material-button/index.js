import React from "react";

import MaterialRipple from "../material-ripple";

import "./style.scss";

const MaterialButton = props => (
  <MaterialRipple {...props} className={`material-button ${props.className}`} />
);

MaterialButton.defaultProps = {
  className: "",
  text: "OK"
};

export default MaterialButton;

/* <button {...props} className={`material-button ${props.className}`}>
  {props.text}
</button> */
