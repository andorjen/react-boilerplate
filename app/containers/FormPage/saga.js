import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
  SUBMIT_FORM,
  SUBMIT_FORM_ERROR,
  SUBMIT_FORM_SUCCESS,
} from './constants';

import { BACKEND_URL, HOME_RELOAD_NEEDED } from '../HomePage/constants';
import { makeSelectFormInput } from './selectors';

function* postNewContentToDatabase() {
  const data = yield select(makeSelectFormInput());
  const cleanupData = data.trim();
  try {
    const res = yield call(axios.post, `${BACKEND_URL}/add`, {
      content: cleanupData,
    });
    yield delay(1000);
    yield put({
      type: SUBMIT_FORM_SUCCESS,
      payload: { content: res.data.content },
    });
    yield put({ type: HOME_RELOAD_NEEDED });
  } catch (err) {
    yield put({
      type: SUBMIT_FORM_ERROR,
      payload: { error: err.response.data.error },
    });
  }
}

function* formSaga() {
  yield takeLatest(SUBMIT_FORM, postNewContentToDatabase);
}

export default formSaga;
