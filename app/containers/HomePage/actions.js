import {
  LOAD_ALL_CONTENTS,
  LOAD_ALL_CONTENTS_SUCCESS,
  LOAD_ALL_CONTENTS_ERROR,
} from './constants';

function requestAllContents() {
  return {
    type: LOAD_ALL_CONTENTS,
  };
}

function requestAllContentsSuccess(data) {
  return {
    type: LOAD_ALL_CONTENTS_SUCCESS,
    payload: data,
  };
}

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
