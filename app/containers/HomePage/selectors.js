import { createSelector } from 'reselect';
import { initialState } from './reducer';
const selectRouter = state => state.router;
const selectHome = state => state.homeReducer || initialState;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectLoading = () =>
  createSelector(
    selectHome,
    globalState => globalState.isLoading,
  );

const makeSelectError = () =>
  createSelector(
    selectHome,
    globalState => globalState.error,
  );

const makeSelectContents = () =>
  createSelector(
    selectHome,
    globalState => globalState.contents,
  );

const makeSelectNeedsLoading = () =>
  createSelector(
    selectHome,
    globalState => globalState.needsLoading,
  );

export {
  selectHome,
  makeSelectLocation,
  makeSelectLoading,
  makeSelectError,
  makeSelectContents,
  makeSelectNeedsLoading,
};
