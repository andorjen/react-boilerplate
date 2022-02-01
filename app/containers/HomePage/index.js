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
} from './selectors';

import CardList from '../../components/CardList';
import NavBar from '../../components/NavBar';
import LoadingIndicator from '../../components/LoadingIndicator';

import { requestAllContents } from './actions';

import homeReducer from './reducer';
import homeSaga from './saga';

function HomePage(props) {
  useInjectReducer({ key: 'homeReducer', reducer: homeReducer });
  useInjectSaga({ key: 'homeSaga', saga: homeSaga });
  useEffect(() => {
    props.getAllData();
  }, []);

  return (
    <div>
      <NavBar />
      {props.isLoading && <LoadingIndicator />}
      {props.isLoading && <h2>Loading...</h2>}
      {props.error && <h3>{props.error.message}</h3>}

      {!props.error && props.contents.length > 0 && (
        <CardList
          contents={props.contents}
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
};
const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  error: makeSelectError(),
  contents: makeSelectContents(),
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
