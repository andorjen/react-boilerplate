/**
 * Actions for FormPage
 */

import {
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_ERROR,
  CHANGE_FORM_INPUT,
} from './constants';

/** function returns action with type CHANGE_FORM_INPUT, and payload of input */
function changeFormInput(input) {
  return {
    type: CHANGE_FORM_INPUT,
    payload: input,
  };
}

/** function returns action with type SUBMIT_INPUT */
function submitForm() {
  return {
    type: SUBMIT_FORM,
  };
}

/** function returns action with type SUBMIT_FORM_SUCCESS, and payload of data */
function submitFormSuccess(data) {
  return {
    type: SUBMIT_FORM_SUCCESS,
    payload: data,
  };
}

/** function returns action with type SUBMIT_FORM_ERROR, and payload of error */
function submitFormError(error) {
  return {
    type: SUBMIT_FORM_ERROR,
    payload: error,
  };
}

export { changeFormInput, submitForm, submitFormSuccess, submitFormError };
