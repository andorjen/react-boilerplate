import { call, put, takeLatest, delay } from 'redux-saga/effects';
import fetchAllContents from './api';
import {
  LOAD_ALL_CONTENTS,
  LOAD_ALL_CONTENTS_ERROR,
  LOAD_ALL_CONTENTS_SUCCESS,
} from './constants';

function* fetchAllData() {
  try {
    yield delay(1000);
    const res = yield call(fetchAllContents);
    yield put({
      type: LOAD_ALL_CONTENTS_SUCCESS,
      payload: { contents: res.contents },
    });
  } catch (err) {
    yield put({ type: LOAD_ALL_CONTENTS_ERROR, payload: { error: err } });
  }
}

function* homeSaga() {
  yield takeLatest(LOAD_ALL_CONTENTS, fetchAllData);
}

export default homeSaga;
