import React from "react";
import { customAddEventListener } from "../helpers/util";
import { importModules } from "../helpers/moduleLoader";
import Aux from "./Aux";
import Header from "./header";
import Routes from "./Routes";

import "../scss/style.scss";

//  React 16 supports array of elements or just plain text; No more extra wrapper!
// export default () => [<Header />, <Routes />];

// To avoid array notation and manually added keys to each of the element,
// you can use an Aux helper function that simply returns all its children.
// const Aux = props => props.children;
export default class App extends React.Component {
  componentDidMount() {
    // lazy load routes
    customAddEventListener(window, "load", this.lazyLoadRoutes);
  }

  lazyLoadRoutes = () => {
    this.props.history && importModules(this.props.history);
  };

  render() {
    return (
      <Aux>
        <Header />
        <Routes />
      </Aux>
    );
  }
}

// Render modal outside DOM tree
// render() {
//   return ReactDOM.createPortal(
//     <div className="modal">
//       {this.props.children}
//     </div>,
//     document.createElement('div')
//   );
// }
