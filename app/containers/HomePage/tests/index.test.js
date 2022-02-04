import React from 'react';
import { render, waitForElement, getByText } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { IntlProvider } from 'react-intl';
import { MemoryRouter, browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';

import axios from 'axios';

import HomePage from '../index';
import configureStore from '../../../configureStore';

let store;

beforeAll(() => {
  store = configureStore({}, browserHistory);
});

// cleanup after each test
afterEach(() => {
  jest.clearAllMocks();
});

/** tests for rendering of Home page */
describe('<HomePage />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render loading on mount', async () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toContainHTML('Loading...');
    expect(container).toContainHTML('Home');
    expect(container).toContainHTML('Add A Card');
  });

  it('should render success api call returned contents', async () => {
    axios.get = jest.fn();
    axios.get.mockResolvedValueOnce({
      data: { contents: ['test1', 'test2', 'test3'] },
    });
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    const test1 = await waitForElement(() => getByText(container, 'test1'));
    const test2 = await waitForElement(() => getByText(container, 'test2'));
    expect(test1).toBeInTheDocument();
    expect(test2).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('should render error message with failed api call', async () => {
    axios.get = jest.fn();
    const netWorkError = {
      response: { data: { error: { message: 'Error' } } },
    };
    axios.get.mockRejectedValueOnce(netWorkError);
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    const errorMsg = await waitForElement(() => getByText(container, 'Error'));
    expect(errorMsg).toBeInTheDocument();
  });
});
