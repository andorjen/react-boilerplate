import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

function Button({ disabled, onClick, text }) {
  const StyledButton = styled.button`
    color: white;
    background-color: ${disabled ? 'grey' : 'rgb(84, 2, 209)'};
    border-radius: 0.4em;
    padding: 0.8em 1em;
    border: none;
    font-size: 1em;

    &:hover {
      background-color: ${disabled ? 'grey' : 'rgb(140, 71, 245)'};
      box-shadow: ${disabled ? 'none' : '0 0.3em 1em rgba(140, 71, 245, 0.3 )'};
      cursor: ${disabled ? 'auto' : 'pointer'};
    }
  `;

  if (disabled) {
    return (
      <Wrapper>
        <StyledButton disabled>{text}</StyledButton>
      </Wrapper>
    );
  }
  return (
    <Wrapper onClick={onClick}>
      <StyledButton>{text}</StyledButton>
    </Wrapper>
  );
}

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
};

export default Button;
