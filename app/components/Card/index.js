/* eslint-disable indent */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

function Card({ content, lastAdded }) {
  const StyledCard = styled.div`
    color: rgb(34, 2, 73);
    background-color: ${lastAdded
      ? 'rgb(247, 179, 52)'
      : 'rgba(2, 219, 125, 0.7)'};
    border-radius: 0.4em;
    padding: 0.8em 1em;
    box-shadow: 0.4em 0.2em 0.2em rgba(2, 219, 125, 0.2);
  `;

  return (
    <Wrapper className="Card-wrapper">
      <StyledCard>{content}</StyledCard>
    </Wrapper>
  );
}

Card.propTypes = {
  content: PropTypes.string,
  lastAdded: PropTypes.bool,
};

export default Card;
