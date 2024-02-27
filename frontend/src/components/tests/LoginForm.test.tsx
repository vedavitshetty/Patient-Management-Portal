import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { LoginPage } from '../../pages/LoginPage';

test('submits login form', () => {
  render(<LoginPage />);
  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByText(/Log In/i);

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
  fireEvent.click(submitButton);
});
