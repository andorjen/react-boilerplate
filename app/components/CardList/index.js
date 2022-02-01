/* eslint-disable react/no-array-index-key */
// use idx as key here for simplicity, ideally should use uuid() for each card

import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import Card from '../Card';

/** */
function CardList({ contents, onClick }) {
  return (
    <Wrapper onClick={onClick}>
      {contents.map((content, idx) => (
        <Card key={idx} content={content} onClick={onClick} />
      ))}
    </Wrapper>
  );
}

CardList.propTypes = {
  onClick: PropTypes.func,
  contents: PropTypes.array,
};

export default CardList;
