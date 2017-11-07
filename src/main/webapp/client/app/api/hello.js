export const hello = () => {
  return dispatch => {
    return fetch("/hello", {
      // method: "post",
      // body: JSON.stringify(data),
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json"
      // }
    })
      .then(response => {
        // Available response type:
        // response.formData()
        // response.json()
        return response.text();
      })
      .then(response => {
        alert(response);
        dispatch({
          type: "TESTING_API_ONLY"
        });
      })
      .catch(function(err) {
        alert(err);
      });
  };
};
