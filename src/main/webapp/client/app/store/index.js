import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import rootReducer from "../reducers";

export const history = createHistory();

// To get rid of eslint warning
/*global __INITIAL_STATE__*/
const initialState = __INITIAL_STATE__ || {};
const enhancers = [];
// routerMiddleware(history) => A middleware you can apply to your Redux store to capture dispatched actions created by the action creators. It will redirect those actions to the provided history instance.
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
  if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function") {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
