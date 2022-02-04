import { call, put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_ALL_CONTENTS,
  LOAD_ALL_CONTENTS_ERROR,
  LOAD_ALL_CONTENTS_SUCCESS,
  BACKEND_URL,
} from './constants';

/** Make Api Call to backend to get all data */
function* fetchAllData() {
  try {
    yield delay(500); // mimick the wait time for api call here, not necessary
    const res = yield call(axios.get, BACKEND_URL);

    // if success, pass response data in reversed order to reducer
    yield put({
      type: LOAD_ALL_CONTENTS_SUCCESS,
      payload: { contents: res.data.contents.reverse() },
    });
  } catch (err) {
    // if error, pass on error to reducer
    yield put({
      type: LOAD_ALL_CONTENTS_ERROR,
      payload: { error: err.response.data.error },
    });
  }
}

/** perform fetchALlData on the latest action of LOAD_ALL_CONTENTS */
function* homeSaga() {
  yield takeLatest(LOAD_ALL_CONTENTS, fetchAllData);
}

export default homeSaga;
