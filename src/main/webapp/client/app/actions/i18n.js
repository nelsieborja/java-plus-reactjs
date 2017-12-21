import * as type from "./index";
import { contains } from "../helpers/util";

export const updatei18n = language => (dispatch, getState) => {
  // Dont do anything if language has already been added
  if (contains(getState().language.languages, language)) {
    return;
  }

  import(`../i18n/${language}`).then(i18n => {
    let labelKey,
      _i18n = {};
    for (labelKey in i18n) {
      _i18n[labelKey] = {
        [language]: i18n[labelKey]
      };
    }

    // Push new translation to i18n state
    dispatch({
      type: type.I18N_UPDATE_REQUESTED,
      i18n: _i18n
    });

    // Push new language to language state
    dispatch({
      type: type.LANGUAGE_ADD_REQUESTED,
      language
    });
  });
};
