import { LANGUAGE_CHANGE_REQUESTED } from "./index";
import { updatei18n } from "./i18n";

export const changeLanguage = language => dispatch => {
  dispatch({
    type: LANGUAGE_CHANGE_REQUESTED,
    language
  });

  dispatch(updatei18n(language));
};
