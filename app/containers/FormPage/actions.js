import {
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_ERROR,
  CHANGE_FORM_INPUT,
} from './constants';

function changeFormInput(input) {
  return {
    type: CHANGE_FORM_INPUT,
    payload: input,
  };
}

function submitForm() {
  return {
    type: SUBMIT_FORM,
  };
}

function submitFormSuccess(data) {
  return {
    type: SUBMIT_FORM_SUCCESS,
    payload: data,
  };
}

function submitFormError(error) {
  return {
    type: SUBMIT_FORM_ERROR,
    payload: error,
  };
}

export { changeFormInput, submitForm, submitFormSuccess, submitFormError };
