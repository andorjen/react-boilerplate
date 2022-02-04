import 'jest-dom/extend-expect';
import { formReducer, initialState } from '../reducer';

import {
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_ERROR,
  CHANGE_FORM_INPUT,
  RELOAD_FORM_PAGE,
} from '../constants';

it('should take action CHANGE_FORM_INPUT', () => {
  expect(
    formReducer(initialState, { type: CHANGE_FORM_INPUT, payload: 'test' }),
  ).toEqual({
    isSubmitting: false,
    hasSubmitted: false,
    formInput: 'test',
    content: '',
  });
});

it('should take action SUBMIT_FORM', () => {
  expect(formReducer(initialState, { type: SUBMIT_FORM })).toEqual({
    isSubmitting: true,
    hasSubmitted: false,
    formInput: '',
    content: '',
  });
});

it('should take action SUBMIT_FORM_SUCCESS', () => {
  expect(
    formReducer(initialState, {
      type: SUBMIT_FORM_SUCCESS,
      payload: { content: 'success' },
    }),
  ).toEqual({
    isSubmitting: false,
    hasSubmitted: true,
    formInput: '',
    content: 'success',
    error: null,
  });
});

it('should take action SUBMIT_FORM_ERROR', () => {
  expect(
    formReducer(initialState, {
      type: SUBMIT_FORM_ERROR,
      payload: { error: { message: 'error' } },
    }),
  ).toEqual({
    isSubmitting: false,
    hasSubmitted: true,
    formInput: '',
    content: '',
    error: { message: 'error' },
  });
});

it('should take action RELOAD_FORM_PAGE', () => {
  expect(
    formReducer(initialState, {
      type: RELOAD_FORM_PAGE,
    }),
  ).toEqual({
    ...initialState,
  });
});
