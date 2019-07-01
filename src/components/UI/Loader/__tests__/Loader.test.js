/* eslint-env jest */

import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';

import Loader from '../Loader';

afterEach(cleanup);

test('Smoke', async () => {
  const { queryAllByTestId } = render(<Loader />);
  expect(queryAllByTestId('loader').length).toBe(1)
});

test('Custom class', async () => {
  const { getByTestId } = render(<Loader className="test"/>);
  expect(getByTestId('loader')).toHaveClass('test');
});
