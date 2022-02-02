import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import postNewContent from './api';
import {
  SUBMIT_FORM,
  SUBMIT_FORM_ERROR,
  SUBMIT_FORM_SUCCESS,
} from './constants';

import { HOME_RELOAD_NEEDED } from '../HomePage/constants';
import { makeSelectFormInput } from './selectors';

function* postNewContentToDatabase() {
  const data = yield select(makeSelectFormInput());
  try {
    const res = yield call(postNewContent, data);
    yield delay(1000);
    yield put({ type: SUBMIT_FORM_SUCCESS, payload: { content: res.content } });
    yield put({ type: HOME_RELOAD_NEEDED });
  } catch (err) {
    yield put({ type: SUBMIT_FORM_ERROR, payload: { error: err } });
  }
}

function* formSaga() {
  yield takeLatest(SUBMIT_FORM, postNewContentToDatabase);
}

export default formSaga;
