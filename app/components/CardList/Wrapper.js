import styled from 'styled-components';

const Wrapper = styled.ul`
  @media (min-width: 500px) {
    columns: 2;
  }
  @media (min-width: 780px) {
    columns: 3;
  }
  @media (min-width: 980px) {
    columns: 4;
  }
  column-gap: 1em;
  background-color: transparent;
  padding: 0 1em 1em 1em;
`;

export default Wrapper;
