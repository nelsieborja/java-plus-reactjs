import * as types from "./index";

export const increment = () => {
  return dispatch => {
    dispatch({
      type: types.INCREMENT_REQUESTED
    });

    dispatch({
      type: types.INCREMENT
    });
  };
};

export const incrementAsync = () => {
  return dispatch => {
    dispatch({
      type: types.INCREMENT_REQUESTED
    });

    return setTimeout(() => {
      dispatch({
        type: types.INCREMENT
      });
    }, 3000);
  };
};

export const decrement = () => {
  return dispatch => {
    dispatch({
      type: types.DECREMENT_REQUESTED
    });

    dispatch({
      type: types.DECREMENT
    });
  };
};

export const decrementAsync = () => {
  return dispatch => {
    dispatch({
      type: types.DECREMENT_REQUESTED
    });

    return setTimeout(() => {
      dispatch({
        type: types.DECREMENT
      });
    }, 3000);
  };
};
