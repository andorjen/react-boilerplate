/*
 * Form Page
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectFormInput,
  makeSelectIsSubmitting,
  makeSelectHasSubmitted,
  makeSelectError,
} from './selectors';

import { changeFormInput, submitForm } from './actions';

import NavBar from '../../components/NavBar';
import LoadingIndicator from '../../components/LoadingIndicator';
import Button from '../../components/Button';
import { formReducer } from './reducer';
import formSaga from './saga';

function FormPage({
  hasSubmitted,
  isSubmitting,
  formInput,
  postData,
  changeInput,
  error,
}) {
  useInjectReducer({ key: 'formReducer', reducer: formReducer });
  useInjectSaga({ key: 'formSaga', saga: formSaga });

  return (
    <div style={{ textAlign: 'center' }}>
      <NavBar />
      <h1>Form</h1>
      <form onSubmit={postData}>
        <label htmlFor="input-content"> type your card text here:</label>
        <input
          id="input-content"
          onChange={changeInput}
          type="text"
          value={formInput}
        />
        <div className="FormPage-button">
          <Button text="Submit" disabled={isSubmitting} onClick={postData} />
          {isSubmitting && (
            <span>
              <LoadingIndicator /> Submitting...
            </span>
          )}
        </div>
      </form>
      {hasSubmitted && error && <h2>{error.message}</h2>}
    </div>
  );
}

FormPage.propTypes = {
  hasSubmitted: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  formInput: PropTypes.string,
  postData: PropTypes.func,
  changeInput: PropTypes.func,
  error: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  formInput: makeSelectFormInput(),
  isSubmitting: makeSelectIsSubmitting(),
  hasSubmitted: makeSelectHasSubmitted(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeInput: evt => {
      dispatch(changeFormInput(evt.target.value));
    },
    postData: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(submitForm());
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
)(FormPage);
