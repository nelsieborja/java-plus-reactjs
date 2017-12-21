import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import counter from "./counter";
import i18n from "./i18n";
import language from "./language";

export default combineReducers({
  routing: routerReducer,
  counter,
  i18n,
  language
});
