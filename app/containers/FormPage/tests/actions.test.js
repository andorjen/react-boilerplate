import 'jest-dom/extend-expect';
import {
  changeFormInput,
  submitForm,
  submitFormSuccess,
  submitFormError,
} from '../actions';

import {
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_ERROR,
  CHANGE_FORM_INPUT,
} from '../constants';

it('change form input', () => {
  expect(changeFormInput('test')).toEqual({
    type: CHANGE_FORM_INPUT,
    payload: 'test',
  });
});

it('submit form', () => {
  expect(submitForm()).toEqual({
    type: SUBMIT_FORM,
  });
});

it('submit form success', () => {
  expect(submitFormSuccess('success')).toEqual({
    type: SUBMIT_FORM_SUCCESS,
    payload: 'success',
  });
});

it('submit form error', () => {
  expect(submitFormError('err msg')).toEqual({
    type: SUBMIT_FORM_ERROR,
    payload: 'err msg',
  });
});
