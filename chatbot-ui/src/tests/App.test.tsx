import React from 'react';
import { render, screen } from '@testing-library/react'
import axios from 'axios'
import App from '../App'

jest.mock('axios')

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello! Welcome to LSEG. I'm here to help you./i);
  expect(linkElement).toBeInTheDocument()
})
