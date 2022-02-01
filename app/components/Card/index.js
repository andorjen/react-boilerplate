import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

function Card({ content, onClick }) {
  const StyledCard = styled.div`
    background-color: rgb(255, 158, 0);
    border-radius: 0.4em;
    padding: 0.8em 1em;
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
