import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import About from "./about";

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
  </Switch>
);
// render={() => System.import("./home").then(module => module.default)}
