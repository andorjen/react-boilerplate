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
import styled from 'styled-components';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectContents,
  makeSelectLoading,
  makeSelectError,
  makeSelectNeedsLoading,
} from './selectors';

import { makeSelectContent } from '../FormPage/selectors';
import CardList from '../../components/CardList';
import NavBar from '../../components/NavBar';
import LoadingIndicator from '../../components/LoadingIndicator';

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
function HomePage({
  needsLoading,
  isLoading,
  error,
  contents,
  getAllData,
  lastAdded,
}) {
  useInjectReducer({ key: 'homeReducer', reducer: homeReducer });
  useInjectSaga({ key: 'homeSaga', saga: homeSaga });

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
        {!error && !isLoading && <h2>All Cards</h2>}
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
const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  error: makeSelectError(),
  contents: makeSelectContents(),
  needsLoading: makeSelectNeedsLoading(),
  lastAdded: makeSelectContent(),
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
