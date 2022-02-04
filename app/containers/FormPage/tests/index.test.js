import React from 'react';
import { render, getByText, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { IntlProvider } from 'react-intl';
import { MemoryRouter, browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';

// import axios from 'axios';

import FormPage from '../index';
import configureStore from '../../../configureStore';

let store;

beforeAll(() => {
  store = configureStore({}, browserHistory);
});

// cleanup after each test
afterEach(() => {
  jest.clearAllMocks();
});

/** tests for rendering of Form page */
describe('<HomePage />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <MemoryRouter>
            <FormPage />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the correct info', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <MemoryRouter>
            <FormPage />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    const text = getByText(container, 'Add Your Own Text');
    const submit = getByText(container, 'Submit');
    expect(text).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });

  it('should show submitting status after form submission', () => {
    const postData = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <MemoryRouter>
            <FormPage postData={postData} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    fireEvent.submit(document.querySelector('form'));
    const submission = getByText(
      container,
      'Submitting... please do not refresh page',
    );
    expect(submission).toBeInTheDocument();

    const button = document.querySelector('button');
    expect(button).toHaveAttribute('disabled');
  });
});
