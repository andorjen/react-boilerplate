import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
  SUBMIT_FORM,
  SUBMIT_FORM_ERROR,
  SUBMIT_FORM_SUCCESS,
} from './constants';

import { BACKEND_URL } from '../HomePage/constants';
import { makeSelectFormInput } from './selectors';

/** Make Api Call to backend to post data into database */
function* postNewContentToDatabase() {
  // get data from formInput state, clean up by trimming any white spaces
  const data = yield select(makeSelectFormInput());
  const cleanupData = data.trim();

  try {
    // make api call
    const res = yield call(axios.post, `${BACKEND_URL}/add`, {
      content: cleanupData,
    });
    yield delay(1000); // mimick the wait time for api call here, not necessary

    // if success, pass res data to reducer, and set home page to need reload
    yield put({
      type: SUBMIT_FORM_SUCCESS,
      payload: { content: res.data.content },
    });
  } catch (err) {
    // if fail, pass error to reducer
    yield put({
      type: SUBMIT_FORM_ERROR,
      payload: { error: err.response.data.error },
    });
  }
}

/** performs api call on the latest SUBMIT_FORM action */
function* formSaga() {
  yield takeLatest(SUBMIT_FORM, postNewContentToDatabase);
}

export default formSaga;
