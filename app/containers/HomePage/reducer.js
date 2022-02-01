import {
  LOAD_ALL_CONTENTS,
  LOAD_ALL_CONTENTS_ERROR,
  LOAD_ALL_CONTENTS_SUCCESS,
} from './constants';

// The initial state of the HomePage
export const initialState = {
  isLoading: false,
  contents: [],
};

function homeReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_ALL_CONTENTS:
      return { ...state, isLoading: true };
    case LOAD_ALL_CONTENTS_SUCCESS:
      return { ...state, isLoading: false, contents: payload.contents };
    case LOAD_ALL_CONTENTS_ERROR:
      return { ...state, isLoading: false, error: payload.error };
    default:
      return state;
  }
}

export default homeReducer;
