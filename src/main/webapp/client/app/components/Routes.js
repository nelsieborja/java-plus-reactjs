import React from "react";
import { Switch, Route } from "react-router-dom";
import { chunkLoadFailed } from "../helpers/moduleLoader";
// import Home from "./home";
// import About from "./about";
import asyncComponent from "./AsyncComponent";

const Home = asyncComponent(() =>
  import(/* webpackChunkName: "homepage" */ "./home")
    .then(module => module.default)
    .catch(chunkLoadFailed)
);
const About = asyncComponent(() =>
  import(/* webpackChunkName: "aboutpage" */ "./about")
    .then(module => module.default)
    .catch(chunkLoadFailed)
);

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
  </Switch>
);
