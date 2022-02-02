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

import NavBar from '../../components/NavBar';
import Button from '../../components/Button';
import { formReducer } from './reducer';
import formSaga from './saga';

const FormPageWrapper = styled.div`
  background-color: rgba(2, 219, 125, 0.7);
  min-height: 100vh;
  padding: 4em;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
`;

const FormWrapper = styled.div`
  background-color: white;
  padding: 1em;
  border-radius: 0.4em;
  width: 60%;
  margin-left: 20%;
  margin-top: 5%;
  font-family: 'Open Sans', sans-serif;
`;

const InputBox = styled.textarea`
  width: 60%;
  height: 8em;
`;

const FormLabelWrapper = styled.div`
  text-align: left;
  width: 60%;
  margin-left: 20%;
  padding-top: 1em;
  padding-bottom: 0.5em;
`;

const InlineBlock = styled.div`
  display: inline-block;
  max-height: 100%;
  margin-left: 1em;
`;

const SuccessMessageContainer = styled.div`
  background-color: rgb(201, 242, 202);
  text-align: center;
  font-size: 0.9em;
  padding: 0.2em;
  border-radius: 0.2em;
  width: 60%;
  margin-left: 20%;
`;
const ErrorMessageContainer = styled.div`
  background-color: rgb(250, 181, 165);
  text-align: center;
  font-size: 0.9em;
  padding: 0.2em;
  border-radius: 0.2em;
  width: 60%;
  margin-left: 20%;
`;

const StyledPara = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 0.9em;
`;

function FormPage({
  hasSubmitted,
  isSubmitting,
  formInput,
  postData,
  changeInput,
  error,
  content,
}) {
  useInjectReducer({ key: 'formReducer', reducer: formReducer });
  useInjectSaga({ key: 'formSaga', saga: formSaga });

  return (
    <div>
      <NavBar />
      <FormPageWrapper>
        <FormWrapper>
          <h2>Add Your Own Text</h2>

          {hasSubmitted && content && (
            <SuccessMessageContainer>
              <StyledPara>
                You have successfully submitted the text, go to
                <a href="http://localhost:3000"> HOME PAGE </a>to view.
              </StyledPara>
            </SuccessMessageContainer>
          )}

          {hasSubmitted && error && (
            <ErrorMessageContainer>
              <StyledPara>
                {error.message}. Please make sure to enter valid texts.
              </StyledPara>
            </ErrorMessageContainer>
          )}

          <form onSubmit={postData}>
            <FormLabelWrapper>
              <label htmlFor="input-content"> Text: </label>
            </FormLabelWrapper>
            <InputBox
              id="input-content"
              onChange={changeInput}
              type="text"
              value={formInput}
              placeholder="input length should be between 1 to 1000"
            />

            <div>
              <InlineBlock>
                <Button
                  text="Submit"
                  disabled={isSubmitting}
                  onClick={postData}
                />
              </InlineBlock>
              {isSubmitting && <InlineBlock>Submitting...</InlineBlock>}
            </div>
          </form>
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
