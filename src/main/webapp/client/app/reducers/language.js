import * as type from "../actions";
import { immutableObjectMerge, immutableArrayMerge } from "../helpers/util";

export default (state = {}, action) => {
  switch (action.type) {
  case type.LANGUAGE_CHANGE_REQUESTED:
    return immutableObjectMerge(state, {
      current: action.language
    });

  case type.LANGUAGE_ADD_REQUESTED:
    return immutableObjectMerge(state, {
      languages: immutableArrayMerge(state.languages, action.language)
    });

  default:
    return state;
  }
};
