import React from "react";
import MaterialButton from "../material-button";

export default props => (
  <section className="g-flex-item-stretch">
    <p className="counter">Rate❤️ {props.count}%</p>

    <MaterialButton
      text="Increment"
      onClick={props.increment}
      disabled={props.isIncrementing}
    />

    <MaterialButton
      text="Increment Async"
      onClick={props.incrementAsync}
      disabled={props.isIncrementing}
    />

    <MaterialButton
      text="Decrement"
      onClick={props.decrement}
      disabled={props.isDecrementing}
    />

    <MaterialButton
      text="Decrement Async"
      onClick={props.decrementAsync}
      disabled={props.isDecrementing}
    />
  </section>
);
