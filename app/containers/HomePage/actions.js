/**
 * Actions for HomePage
 */
import {
  LOAD_ALL_CONTENTS,
  LOAD_ALL_CONTENTS_SUCCESS,
  LOAD_ALL_CONTENTS_ERROR,
} from './constants';

/** returns an action with type of LOAD_ALL_CONTENTS */
function requestAllContents() {
  return {
    type: LOAD_ALL_CONTENTS,
  };
}

/** returns an action with type LOAD_ALL_CONTENTS_SUCCESS, and payload of data */
function requestAllContentsSuccess(data) {
  return {
    type: LOAD_ALL_CONTENTS_SUCCESS,
    payload: data,
  };
}

/** returns an action with type LOAD_ALL_CONTENTS_ERROR, and payload of err */
function requestAllContentsError(err) {
  return {
    type: LOAD_ALL_CONTENTS_ERROR,
    payload: err,
  };
}

export {
  requestAllContents,
  requestAllContentsSuccess,
  requestAllContentsError,
};
