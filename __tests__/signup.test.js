import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Signup from '../src/pages/signup.js';
import { act } from 'react-dom/test-utils';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/pages/login.js';
import InitialSurvey from '../src/pages/initialSurvey.js';

jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  Link: jest.fn().mockImplementation(({ children, to }) => <a href={to}>{children}</a>)
}));

const mockAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwMjM1NTk4MSwianRpIjoiMWFhMTA5NGUtNTdlMy00YTczLTk1MDItODYwZmZmNGRjYWMyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MywibmJmIjoxNzAyMzU1OTgxLCJleHAiOjE3MDIzNTk1ODEsInJvbGVfaWQiOjJ9.lPp3jrs8Qu35ScQR-nRVnmaNHO7viUjwtBCRYoAal5M'

describe('Signup Component', () => {
  it('renders the signup page', async () => {
    await act(async () => {
      render(
        <Router>
          <Signup />
        </Router>
      );
    });
  });
  it('allows user input', async () => {
    await act(async () => {
      render(
        <Router>
          <Signup />
        </Router>
      );
    });
    const role = screen.getByLabelText('Role:');
    fireEvent.change(role, { target: { value: 1 } });
    expect(role.value).toBe("1");
    const username = screen.getByLabelText('Username:');
    fireEvent.change(username, { target: { value: 'testUsername' } });
    expect(username.value).toBe('testUsername');
    const email = screen.getByLabelText('Email:');
    fireEvent.change(email, { target: { value: 'testEmail' } });
    expect(email.value).toBe('testEmail');
    const password = screen.getByLabelText('Password:');
    fireEvent.change(password, { target: { value: 'testPassword' } });
    expect(password.value).toBe('testPassword');
    const phone = screen.getByLabelText('Phone Number:');
    fireEvent.change(phone, { target: { value: 1110001010 } });
    expect(phone.value).toBe("1110001010");
  });
  it('allows user to submit', async () => {
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        data: {
          'access token': mockAccessToken,
        }
      })
    );
    await act(async () => {
      render(
        <Router initialEntries={['/signup']}>
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/initial-survey' element={<InitialSurvey />} />
          </Routes>
        </Router>
      );
    });

    const role = screen.getByLabelText('Role:');
    fireEvent.change(role, { target: { value: 1 } });
    const username = screen.getByLabelText('Username:');
    fireEvent.change(username, { target: { value: 'testUsername' } });
    const email = screen.getByLabelText('Email:');
    fireEvent.change(email, { target: { value: 'testEmail' } });
    const password = screen.getByLabelText('Password:');
    fireEvent.change(password, { target: { value: 'testPassword' } });
    const phone = screen.getByLabelText('Phone Number:');
    fireEvent.change(phone, { target: { value: 1110001010 } });
    const submit = screen.getByRole('button', { name: 'Sign Up' });
    fireEvent.click(submit);
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(window.location.pathname).toBe('/initial-survey'));
  });
  it('allows user to navigate to login page', async () => {
    await act(async () => {
      render(
      <Router initialEntries={['/signup']}>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
      );
    });
    const login = screen.getByText('Login');
    fireEvent.click(login);
    await waitFor(() => expect(window.location.pathname).toBe('/login'));
  });
});