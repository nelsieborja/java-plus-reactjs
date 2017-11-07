import React from "react";

export default class Ripple extends React.PureComponent {
  componentDidMount() {
    this.$timeout = setTimeout(() => {
      this.refs.ripple.remove();
    }, 400);
  }

  componentWillUnmount() {
    // Cleanup setTimeout()
    this.$timeout && clearTimeout(this.$timeout);
  }

  render() {
    let className = "ripple";
    if (this.props.centerRipple) {
      className += " ripple--center";
    }
    if (this.props.smallRipple) {
      className += " ripple--small";
    }

    return (
      <span
        ref="ripple"
        className={className}
        style={{ left: this.props.left, top: this.props.top }}
      />
    );
  }
}
