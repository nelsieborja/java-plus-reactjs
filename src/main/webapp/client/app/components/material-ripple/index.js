// Lets use arrow function inside the component so no need to bind each method
// But make sure stage-2 is enabled from babel in order for this to work

import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  isFunction,
  isUndefined,
  immutableArrayMerge,
  omitObject,
  getUniqueId
} from "../../helpers/util";

import Ripple from "./Ripple";

import "./style.scss";

const rippleHalfSize = 10;
class MaterialRipple extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      delaying: false,
      ripples: []
    };
  }

  componentWillUnmount() {
    this._clearTimeout();
  }

  // Check if component is a link
  _isLink = !isUndefined(this.props.to);

  // Ripple preparation
  _startRipple = event => {
    let left = "",
      top = "";

    // Obtain position for dynamic (centerRipple = false) ripple
    if (!this.props.centerRipple) {
      const boundingClientRect = this.refs.materialRipple.getBoundingClientRect(),
        scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop,
        clientTop =
          document.documentElement.clientTop || document.body.clientTop || 0;

      left = event.pageX - boundingClientRect.left - rippleHalfSize;
      top =
        event.pageY -
        (boundingClientRect.top + scrollTop - clientTop) -
        rippleHalfSize;
    }

    // Create ripple
    this._createRipple(left, top);

    // Delay event to give ripple enough exposure :D
    if (this.props.delayRipple) {
      if (this.state.delaying) {
        return;
      }

      this._clearTimeout();

      // Set to true to avoid multiple clicks
      this.setState({
        delaying: true
      });

      this.$timeout = setTimeout(() => {
        // Stop the delay
        // Executed first to get rid of the "unmounted component" warning
        this.setState({
          delaying: false
        });

        this._invokeClick();
      }, 300);

      return;
    }

    // Otherwise, invoke immediately
    this._invokeClick();
  };

  // Create ripples
  _createRipple = (left, top) => {
    this.setState({
      ripples: immutableArrayMerge(
        this.state.ripples,
        <Ripple
          key={getUniqueId()}
          centerRipple={this.props.centerRipple}
          smallRipple={this.props.smallRipple}
          left={left}
          top={top}
        />
      )
    });
  };

  // Cleanup setTimeout()
  _clearTimeout = () => {
    this.$timeout && clearTimeout(this.$timeout);
  };

  _invokeClick = () => {
    // Lets invoke the onClick event
    if (isFunction(this.props.onClick)) {
      this.props.onClick();
    }

    // Otherwise lets redirect page to given URL
    if (this._isLink) {
      this.props.changePage(this.props.to);
    }
  };

  render() {
    // immutable assign and omit custom properties
    const customProps = omitObject(this.props, [
      "centerRipple",
      "delayRipple",
      "smallRipple",
      "changePage"
    ]);
    customProps.ref = "materialRipple";
    customProps.onClick = this._startRipple;
    customProps.className += " ripple-wrap";

    // props "to" is defined, make it link
    if (this._isLink) {
      customProps.type = "a";
    }

    return React.createElement(
      customProps.type,
      customProps,
      customProps.text || customProps.children,
      this.state.ripples
    );
  }
}

MaterialRipple.defaultProps = {
  centerRipple: true,
  className: "",
  delayRipple: false,
  smallRipple: false,
  type: "button"
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: url => push(url)
    },
    dispatch
  );
export default connect(null, mapDispatchToProps)(MaterialRipple);
