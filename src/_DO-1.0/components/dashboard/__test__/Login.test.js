import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import LoginForm from '../../../../components/login/loginform';

describe('LoginForm', () => {
  test('should submit the form with valid email and password', async () => {
    const { getByLabelText } = render(<LoginForm />);
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    fireEvent.change(emailInput, { target: { value: 'example@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
});

  test('should display error for invalid email', () => {
    const { getByLabelText, getByText, getByRole } = render(<LoginForm />);
    const emailInput = getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'example@gmail.com' } });
    const loginButton = getByText('Login');
    fireEvent.click(loginButton);
    const emailError = getByRole('alert');
    expect(emailError).toHaveTextContent('Please enter a valid email');
  });

  test('should display error for invalid password', () => {
    const { getByLabelText, getByText, getByRole } = render(<LoginForm />);
    const passwordInput = getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'pass' } });
    const loginButton = getByText('Login');
    fireEvent.click(loginButton);
    const passwordError = getByRole('alert');
    expect(passwordError).toHaveTextContent('Please enter a valid password');
  });

  test('should toggle password visibility', () => {
    const { getByLabelText, getByTestId } = render(<LoginForm />);
    const passwordInput = getByLabelText('Password');
    const toggleButton = getByTestId('toggle-password-button');
    expect(passwordInput.type).toBe('password');
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  test('should navigate to forgot password page', () => {
    const { getByText } = render(<LoginForm />);
    const forgotPasswordLink = getByText('Forgot password?');
    fireEvent.click(forgotPasswordLink);
  });
});
