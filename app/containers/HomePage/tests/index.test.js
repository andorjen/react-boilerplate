import React from 'react';
import { render } from 'react-testing-library';
// import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from 'utils/history';
import HomePage from '../index';
import configureStore from '../../../configureStore';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);

describe('<HomePage />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
