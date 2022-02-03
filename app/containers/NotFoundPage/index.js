/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import messages from './messages';
const Header = styled.div`
  text-align: center;
  height: 6em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(250, 234, 112);
  margin: 1em 1.6em 0 1.6em;
  border-radius: 0.4em;
`;

export default function NotFound() {
  return (
    <div>
      <NavBar />
      <Header>
        <h1 style={{ textAlign: 'center' }}>
          <FormattedMessage {...messages.header} />
        </h1>
      </Header>
    </div>
  );
}
