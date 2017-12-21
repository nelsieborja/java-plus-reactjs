import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import store, { history } from "../store";
import App from "./App";

// import Loadable from "react-loadable";
// const App = Loadable.Map({
//   loader: {
//     component: () => import("./App"),
//     i18n: () => import("../labels/en")
//   },
//   loading: () => null,
//   render({ component: { default: Component }, i18n }, props) {
//     return <Component {...props} i18n={i18n} />;
//   }
// });

export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);
