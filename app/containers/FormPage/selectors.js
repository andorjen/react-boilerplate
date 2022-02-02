import { createSelector } from 'reselect';
import { initialState } from './reducer';
// const selectRouter = state => state.router;
const selectForm = state => state.formReducer || initialState;

// const makeSelectLocation = () =>
//   createSelector(
//     selectRouter,
//     routerState => routerState.location,
//   );

const makeSelectFormInput = () =>
  createSelector(
    selectForm,
    globalState => globalState.formInput,
  );

const makeSelectIsSubmitting = () =>
  createSelector(
    selectForm,
    globalState => globalState.isSubmitting,
  );

const makeSelectHasSubmitted = () =>
  createSelector(
    selectForm,
    globalState => globalState.hasSubmitted,
  );

const makeSelectError = () =>
  createSelector(
    selectForm,
    globalState => globalState.error,
  );

export {
  selectForm,
  makeSelectFormInput,
  makeSelectIsSubmitting,
  makeSelectHasSubmitted,
  makeSelectError,
};
