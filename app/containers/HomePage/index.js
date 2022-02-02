/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectContents,
  makeSelectLoading,
  makeSelectError,
  makeSelectNeedsLoading,
} from './selectors';

import CardList from '../../components/CardList';
import NavBar from '../../components/NavBar';
import LoadingIndicator from '../../components/LoadingIndicator';

import { requestAllContents } from './actions';

import homeReducer from './reducer';
import homeSaga from './saga';

function HomePage({ needsLoading, isLoading, error, contents, getAllData }) {
  useInjectReducer({ key: 'homeReducer', reducer: homeReducer });
  useInjectSaga({ key: 'homeSaga', saga: homeSaga });
  useEffect(() => {
    if (needsLoading) getAllData();
  }, []);

  return (
    <div>
      <NavBar />
      <div style={{ textAlign: 'center' }}>
        {isLoading && <LoadingIndicator />}
        {isLoading && <h2>Loading...</h2>}
        {error && <h3>{error.message}</h3>}
        {!error && !isLoading && <h2>Here are all the cards</h2>}
      </div>

      {!error && contents.length > 0 && (
        <CardList
          contents={contents.reverse()}
          onClick={() => {
            console.log('clicked');
          }}
        />
      )}
    </div>
  );
}

HomePage.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  contents: PropTypes.array,
  getAllData: PropTypes.func,
  needsLoading: PropTypes.bool,
};
const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  error: makeSelectError(),
  contents: makeSelectContents(),
  needsLoading: makeSelectNeedsLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllData: () => {
      dispatch(requestAllContents());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
