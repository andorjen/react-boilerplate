/*
 * Form Page
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectFormInput,
  makeSelectIsSubmitting,
  makeSelectHasSubmitted,
  makeSelectError,
  makeSelectContent,
} from './selectors';

import { changeFormInput, submitForm } from './actions';
import { RELOAD_FORM_PAGE } from './constants';
import NavBar from '../../components/NavBar';
import Button from '../../components/Button';
import { formReducer } from './reducer';
import formSaga from './saga';

const FormPageWrapper = styled.div`
  background-color: rgba(2, 219, 125, 0.7);
  min-height: 100vh;
  padding: 10%;
  font-family: 'Open Sans', sans-serif;
`;

const FormWrapper = styled.div`
  text-align: center;
  background-color: white;
  padding: 1em;
  border-radius: 0.4em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Open Sans', sans-serif;
`;

const FormHeader = styled.h2`
  background-color: rgb(250, 234, 112);
  padding: 0.5em;
  border-radius: 0.2em;
  width: 60%;
`;

const StyledForm = styled.form`
  width: 60%;
`;
const FormLabel = styled.div`
  text-align: left;
  margin: 1em 0 0.3em 0;
`;

const FormInput = styled.textarea`
  text-align: left;
  width: 100%;
  height: 8em;
`;
const SuccessMessageContainer = styled.div`
  background-color: rgb(201, 242, 202);
  text-align: center;
  font-size: 1.2em;
  padding: 0.3em;
  border-radius: 0.2em;
  font-family: 'Open Sans', sans-serif;
  width: 60%;
`;
const ErrorMessageContainer = styled.div`
  background-color: rgb(250, 181, 165);
  text-align: center;
  font-size: 1.2em;
  padding: 0.3em;
  border-radius: 0.2em;
  font-family: 'Open Sans', sans-serif;
  width: 60%;
`;

function FormPage({
  hasSubmitted,
  isSubmitting,
  formInput,
  postData,
  changeInput,
  error,
  content,
  reloadPage,
}) {
  useInjectReducer({ key: 'formReducer', reducer: formReducer });
  useInjectSaga({ key: 'formSaga', saga: formSaga });
  useEffect(() => {
    reloadPage();
  }, []);
  return (
    <div>
      <NavBar />
      <FormPageWrapper>
        <FormWrapper>
          <FormHeader>Add Your Own Text</FormHeader>

          {hasSubmitted && content && (
            <SuccessMessageContainer>
              You have successfully submitted the text, go to
              <Link to="/"> HOME PAGE </Link>
              to view.
            </SuccessMessageContainer>
          )}

          {hasSubmitted && error && (
            <ErrorMessageContainer>
              <div>{error.message}</div>
              <div>Please make sure to enter valid texts.</div>
            </ErrorMessageContainer>
          )}

          <StyledForm onSubmit={postData}>
            <FormLabel>
              <label
                htmlFor="input-content"
                style={{ fontFamily: 'Open Sans' }}
              >
                {' '}
                Text:{' '}
              </label>
            </FormLabel>
            <FormInput
              id="input-content"
              onChange={changeInput}
              type="text"
              value={formInput}
              placeholder="input length should be between 1 to 1000"
            />

            <div>
              <Button
                text="Submit"
                disabled={isSubmitting}
                onClick={postData}
              />
              {isSubmitting && <div>Submitting...</div>}
            </div>
          </StyledForm>
        </FormWrapper>
      </FormPageWrapper>
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
  content: PropTypes.string,
  reloadPage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  formInput: makeSelectFormInput(),
  isSubmitting: makeSelectIsSubmitting(),
  hasSubmitted: makeSelectHasSubmitted(),
  error: makeSelectError(),
  content: makeSelectContent(),
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
    reloadPage: () => {
      dispatch({ type: RELOAD_FORM_PAGE });
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
