import {
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_ERROR,
  CHANGE_FORM_INPUT,
  RELOAD_FORM_PAGE,
} from './constants';

// The initial state of the FormPage
export const initialState = {
  isSubmitting: false,
  hasSubmitted: false,
  formInput: '',
  content: '',
};

/** All reducers for FormPage */
function formReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_FORM_INPUT:
      return { ...state, isSubmitting: false, formInput: payload };

    case SUBMIT_FORM:
      return { ...state, isSubmitting: true, hasSubmitted: false };

    case SUBMIT_FORM_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        hasSubmitted: true,
        formInput: '',
        content: payload.content,
        error: null,
      };

    case SUBMIT_FORM_ERROR:
      return {
        ...state,
        isSubmitting: false,
        hasSubmitted: true,
        error: payload.error,
        content: '',
      };
    case RELOAD_FORM_PAGE:
      return { ...initialState };

    default:
      return state;
  }
}

export { formReducer };
