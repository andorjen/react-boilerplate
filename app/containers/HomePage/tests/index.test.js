import React from 'react';
import { render, waitForElement, getByText } from 'react-testing-library';
import 'jest-dom/extend-expect';

// import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import axios from 'axios';

import history from 'utils/history';
import HomePage from '../index';
import configureStore from '../../../configureStore';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);

jest.mock('axios');
// cleanup after each test
afterEach(() => {
  jest.clearAllMocks();
});

/** tests for rendering of Home page */
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

  it('should render loading on mount', async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toContainHTML('Loading...');
    expect(container).toContainHTML('Home');
    expect(container).toContainHTML('Add A Card');
  });

  it('should render success api call returned contents', async () => {
    jest.clearAllMocks();
    axios.get.mockResolvedValueOnce({
      data: { contents: ['test1', 'test2', 'test3'] },
    });
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>,
    );
    const test1 = await waitForElement(() => getByText(container, 'test1'));
    const test2 = await waitForElement(() => getByText(container, 'test2'));
    expect(test1).toBeInTheDocument();
    expect(test2).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  // it('should render error message with failed api call', async () => {
  //   jest.clearAllMocks();
  //   const netWorkError = {
  //     response: { data: { error: { message: 'Error' } } },
  //   };

  //   axios.get.mockRejectedValueOnce(netWorkError);
  //   const { container } = render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <HomePage />
  //       </MemoryRouter>
  //     </Provider>,
  //   );

  //   // fireEvent.click(getByText(container, /Home/i));
  //   // const errMsg = await waitForElement(() => getByText(container, 'Error'));
  //   const errorMsg = await waitForElement(() => getByText(container, 'Error'));
  //   expect(errorMsg).toBeInTheDocument();
  // });
});
