import React from "react";
import { Switch, Route } from "react-router-dom";

import CustomLoadable from "./misc/CustomLoadable";
const Brands = CustomLoadable({
  loader: () => import("./brands")
});
const Search = CustomLoadable({
  loader: () => import("./search")
});
const Home = CustomLoadable({
  loader: () => import("./home"),
  render({ default: Component }, props) {
    // About.preload();
    Search.preload();
    return <Component {...props} />;
  }
});
const About = CustomLoadable({
  loader: () => import("./about"),
  render({ default: Component }, props) {
    Brands.preload();
    return <Component {...props} />;
  }
});
const NotFound = CustomLoadable({
  loader: () => import("./NotFound"),
  render({ default: Component }, props) {
    return <Component {...props} />;
  }
});

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route component={NotFound} />
  </Switch>
);
