import * as types from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case types.INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      };

    case types.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing
      };

    case types.DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true
      };

    case types.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing
      };

    default:
      return state;
  }
};
