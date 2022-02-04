import 'jest-dom/extend-expect';
import homeReducer, { initialState } from '../reducer';
import {
  LOAD_ALL_CONTENTS,
  LOAD_ALL_CONTENTS_ERROR,
  LOAD_ALL_CONTENTS_SUCCESS,
} from '../constants';

it('should take action LOAD_ALL_CONTENTS', () => {
  expect(homeReducer(initialState, { type: LOAD_ALL_CONTENTS })).toEqual({
    isLoading: true,
    contents: [],
    lastAdded: '',
  });
});

it('should take action LOAD_ALL_CONTENTS_SUCCESS', () => {
  expect(
    homeReducer(initialState, {
      type: LOAD_ALL_CONTENTS_SUCCESS,
      payload: { contents: ['test'] },
    }),
  ).toEqual({
    isLoading: false,
    contents: ['test'],
    lastAdded: '',
  });
});

it('should take action LOAD_ALL_CONTENTS_ERROR', () => {
  expect(
    homeReducer(initialState, {
      type: LOAD_ALL_CONTENTS_ERROR,
      payload: { error: { message: 'error' } },
    }),
  ).toEqual({
    isLoading: false,
    contents: [],
    lastAdded: '',
    error: { message: 'error' },
  });
});
