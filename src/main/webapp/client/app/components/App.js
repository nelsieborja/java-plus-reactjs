import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// https://github.com/amsul/react-translated
import { Provider } from "react-translated";

import { updatei18n } from "../actions/i18n";
import { changeLanguage } from "../actions/language";

// import Aux from "./Aux";
import Header from "./header";
import Routes from "./Routes";

import "../scss/style.scss";

//  React 16 supports array of elements or just plain text; No more extra wrapper!
// export default () => [<Header />, <Routes />];

// To avoid array notation and manually added keys to each of the element,
// you can use an Aux helper function that simply returns all its children.
// const Aux = props => props.children;
// export default () => (
//   <Aux>
//     <Header />
//     <Routes />
//   </Aux>
// );

// import { customAddEventListener } from "../helpers/util";
// import { importModules } from "../helpers/moduleLoader";
class App extends React.PureComponent {
  // componentDidMount() {
  //  lazy load routes
  //  customAddEventListener(window, "load", this.lazyLoadRoutes);
  // }

  componentWillMount() {
    this.props.onUpdatei18n(this.props.language);
  }

  // lazyLoadRoutes = () => {
  //  this.props.history && importModules(this.props.history);
  // };

  render() {
    return (
      <Provider language={this.props.language} translation={this.props.i18n}>
        <Header />
        <Routes />
        <select
          onChange={this.props.onChangeLanguage}
          style={{ marginTop: 20, padding: 10, WebkitAppearance: "none" }}
          value={this.props.language}
        >
          <option value="en">English</option>
          <option value="ar">Arabic</option>
        </select>
      </Provider>
    );
  }
}

const mapStateToProps = ({
  language: { current },
  i18n,
  routing: { location }
}) => ({
  language: current,
  i18n,
  location
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onChangeLanguage: ({ target: { value } }) => changeLanguage(value),
      onUpdatei18n: language => updatei18n(language)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);

// Render modal outside DOM tree
// render() {
//   return ReactDOM.createPortal(
//     <div className="modal">
//       {this.props.children}
//     </div>,
//     document.createElement('div')
//   );
// }
