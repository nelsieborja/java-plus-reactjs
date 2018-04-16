import React from "react";

export default props => {
  if (props.error || props.timedOut || props.pastDelay) {
    // When the loader has errored
    return (
      <div className="g-flex g-flex-item-stretch g-flex-content-center">
        {props.error
          ? "Error!"
          : props.timedOut ? "Taking a long time..." : "Loading..."}
      </div>
    );
  } else {
    // When the loader has just started
    return null;
  }
};
