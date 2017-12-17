import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import counter from "./counter";
import language from "./language";

export default combineReducers({
  routing: routerReducer,
  counter,
  language
});
