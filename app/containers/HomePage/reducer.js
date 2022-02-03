import {
  LOAD_ALL_CONTENTS,
  LOAD_ALL_CONTENTS_ERROR,
  LOAD_ALL_CONTENTS_SUCCESS,
  HOME_RELOAD_NEEDED,
} from './constants';

// The initial state of the HomePage
export const initialState = {
  isLoading: false,
  needsLoading: true,
  contents: [],
  lastAdded: '',
};

/** All reducers for home page */
function homeReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_ALL_CONTENTS:
      return { ...state, isLoading: true, needsLoading: false };

    case LOAD_ALL_CONTENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        contents: payload.contents,
        needsLoading: false,
      };

    case LOAD_ALL_CONTENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        needsLoading: true,
      };

    case HOME_RELOAD_NEEDED:
      return {
        ...state,
        needsLoading: true,
      };

    default:
      return state;
  }
}

export default homeReducer;
