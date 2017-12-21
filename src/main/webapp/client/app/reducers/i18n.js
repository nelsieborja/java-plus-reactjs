import { I18N_UPDATE_REQUESTED } from "../actions";
import { immutableObjectDeepMerge } from "../helpers/util";

export default (state = {}, action) => {
  switch (action.type) {
  case I18N_UPDATE_REQUESTED:
    return immutableObjectDeepMerge(state, action.i18n);
  default:
    return state;
  }
};
