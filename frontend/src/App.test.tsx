import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { setUser } from './redux/userSlice';
import { useDispatch } from 'react-redux'; // Importing useDispatch from react-redux
import App from './App';

// Mocking setUser action creator
jest.mock('./redux/userSlice', () => ({
  ...jest.requireActual('./redux/userSlice'),
  setUser: jest.fn(),
}));

describe('App component', () => {
  test('renders login page when not authenticated', () => {
    // Mocking useDispatch to return a mock function
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch); // Casting useDispatch to unknown first, then to jest.Mock

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Asserting that setUser action creator is not called
    expect(setUser).not.toHaveBeenCalled();

    // Asserting that the login text is present
    const loginText = screen.getByText(/Log In/i);
    expect(loginText).toBeInTheDocument();
  });

  test('renders dashboard when authenticated', () => {
    // Mocking useDispatch to return a mock function
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch); // Casting useDispatch to jest.Mock

    // Dispatching setUser action creator with mock data
    store.dispatch(setUser({ id: 1, username: 'testuser' }));

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Asserting that setUser action creator is called with correct data
    expect(setUser).toHaveBeenCalledWith({ id: 1, username: 'testuser' });

    // Asserting that the dashboard text is present
    const dashboardText = screen.getByText(/Dashboard/i);
    expect(dashboardText).toBeInTheDocument();
  });
});
