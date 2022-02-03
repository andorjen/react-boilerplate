import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

/** */
function NavBar() {
  const Nav = styled.nav`
    text-align: center;
    background-color: rgb(34, 2, 73);
    padding: 0.5em;
    font-size: 1.2em;
    display: flex;
    position: sticky;

    & a {
      padding: 0.5em 0;
      width: 10em;
      display: inline-block;
      text-decoration: none;
      color: white;
      border-radius: 0.2em;
      margin: 0 0.5em;
    }

    & a:hover {
      background-color: rgb(140, 71, 245);
    }
  `;
  return (
    <Nav>
      <NavLink
        exact
        to="/"
        activeStyle={{
          backgroundColor: 'rgba(140, 71, 245, 0.4)',
          fontWeight: 'bold',
        }}
      >
        {'Home'}
      </NavLink>
      <NavLink
        exact
        to="/add"
        activeStyle={{
          backgroundColor: 'rgba(140, 71, 245, 0.4)',
          fontWeight: 'bold',
        }}
      >
        {'Add A Card'}
      </NavLink>
    </Nav>
  );
}

export default NavBar;
