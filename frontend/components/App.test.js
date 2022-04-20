// Write your tests here
import React from 'react';
import AppClass from './AppClass.js'
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('sanity', () => {
  expect(true).toBe(true)
})

test('renders the text coordinates', () => {
  render(<AppClass />);

  const coordinatesElement = screen.queryByText(/coordinates/i);

  expect(coordinatesElement).toBeInTheDocument();
  expect(coordinatesElement).toBeTruthy();
  expect(coordinatesElement).toHaveTextContent(/coordinates/i);
});

test('renders directional buttons', () => {
render(<AppClass />);

const upButton = screen.queryByText(/up/i);
const downButton = screen.queryByText(/down/i);
const leftButton = screen.queryByText(/left/i);
const rightButton = screen.queryByText(/right/i);

expect(upButton).toBeInTheDocument();
expect(downButton).toBeInTheDocument();
expect(leftButton).toBeInTheDocument();
expect(rightButton).toBeInTheDocument();

expect(upButton).toBeTruthy();
expect(downButton).toBeTruthy();
expect(leftButton).toBeTruthy();
expect(rightButton).toBeTruthy();

expect(upButton).toHaveTextContent(/up/i);
expect(downButton).toHaveTextContent(/down/i);
expect(leftButton).toHaveTextContent(/left/i);
expect(rightButton).toHaveTextContent(/right/i);
})
