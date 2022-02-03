/*
 * HomePage (route: "/")
 *
 * This is the first thing users see of our App
 * Displays a list of all strings
 *
 * App -> HomePage -> NavBar, CardList...
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { makeSelectContent } from '../FormPage/selectors';
import CardList from '../../components/CardList';
import NavBar from '../../components/NavBar';
import LoadingIndicator from '../../components/LoadingIndicator';

import {
  makeSelectContents,
  makeSelectLoading,
  makeSelectError,
  makeSelectNeedsLoading,
} from './selectors';
import { requestAllContents } from './actions';
import homeReducer from './reducer';
import homeSaga from './saga';

/** option to add event delegation to CardList, pass in onClik = {funcName} */
// function hideElement(evt) {
//   const target = evt.target.closest('li');
//   target.style = 'display:none';
// }

const HomeHeader = styled.div`
  text-align: center;
  height: 6em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(250, 234, 112);
  margin: 1em 1.6em 0 1.6em;
  border-radius: 0.4em;
`;

const PaddedWrapper = styled.div`
  padding: 1em;
`;
/** Renders HomePage Container */
function HomePage({
  needsLoading,
  isLoading,
  error,
  contents,
  getAllData,
  lastAdded,
}) {
  // Inject reducer and saga to root
  useInjectReducer({ key: 'homeReducer', reducer: homeReducer });
  useInjectSaga({ key: 'homeSaga', saga: homeSaga });

  // load all data on page mount;
  // and when needsLoading is set to true(after upload a new string on FormPage)
  useEffect(() => {
    if (needsLoading) getAllData();
  }, []);

  return (
    <div>
      <NavBar />
      <HomeHeader>
        {isLoading && (
          <PaddedWrapper>
            <LoadingIndicator />
          </PaddedWrapper>
        )}
        {isLoading && (
          <PaddedWrapper>
            <h2>Loading...</h2>
          </PaddedWrapper>
        )}
        {error && <h3>{error.message}</h3>}
        {!error && !isLoading && <h2> All Cards </h2>}
      </HomeHeader>

      {!error && contents.length > 0 && (
        <CardList lastAdded={lastAdded} contents={contents} />
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
  lastAdded: PropTypes.string,
};

// map all related states to props
const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  error: makeSelectError(),
  contents: makeSelectContents(),
  needsLoading: makeSelectNeedsLoading(),
  lastAdded: makeSelectContent(),
});

// map function getAllData to props, used in useEffect() on page mount
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
