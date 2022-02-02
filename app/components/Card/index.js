import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

function Card({ content, onClick }) {
  const StyledCard = styled.div`
    color: rgb(34, 2, 73);
    background-color: rgba(2, 219, 125, 0.7);
    border-radius: 0.4em;
    padding: 0.8em 1em;
    box-shadow: 0.4em 0.2em 0.2em rgba(2, 219, 125, 0.2);
  `;

  return (
    <Wrapper onClick={onClick}>
      <StyledCard>{content}</StyledCard>
    </Wrapper>
  );
}

Card.propTypes = {
  onClick: PropTypes.func,
  content: PropTypes.string,
};

export default Card;
