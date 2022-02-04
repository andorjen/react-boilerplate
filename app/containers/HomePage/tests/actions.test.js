import 'jest-dom/extend-expect';
import {
  requestAllContents,
  requestAllContentsSuccess,
  requestAllContentsError,
} from '../actions';

import {
  LOAD_ALL_CONTENTS,
  LOAD_ALL_CONTENTS_SUCCESS,
  LOAD_ALL_CONTENTS_ERROR,
} from '../constants';
it('request all contents', () => {
  expect(requestAllContents()).toEqual({
    type: LOAD_ALL_CONTENTS,
  });
});

it('request all contents success', () => {
  expect(requestAllContentsSuccess('success data')).toEqual({
    type: LOAD_ALL_CONTENTS_SUCCESS,
    payload: 'success data',
  });
});

it('request all contents fail', () => {
  expect(requestAllContentsError('err msg')).toEqual({
    type: LOAD_ALL_CONTENTS_ERROR,
    payload: 'err msg',
  });
});
