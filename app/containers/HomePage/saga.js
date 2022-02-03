import { call, put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_ALL_CONTENTS,
  LOAD_ALL_CONTENTS_ERROR,
  LOAD_ALL_CONTENTS_SUCCESS,
  BACKEND_URL,
} from './constants';

function* fetchAllData() {
  try {
    yield delay(1000);
    const res = yield call(axios.get, BACKEND_URL);
    yield put({
      type: LOAD_ALL_CONTENTS_SUCCESS,
      payload: { contents: res.data.contents.reverse() },
    });
  } catch (err) {
    yield put({
      type: LOAD_ALL_CONTENTS_ERROR,
      payload: { error: err.response.data.error },
    });
  }
}

function* homeSaga() {
  yield takeLatest(LOAD_ALL_CONTENTS, fetchAllData);
}

export default homeSaga;
