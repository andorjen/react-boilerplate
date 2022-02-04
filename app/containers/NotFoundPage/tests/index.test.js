import React from 'react';
import { render } from 'react-testing-library';
// import { IntlProvider } from 'react-intl';

import 'jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from 'utils/history';
import configureStore from '../../../configureStore';
import NotFoundPage from '../index';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);

describe('<NotFoundPage />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
