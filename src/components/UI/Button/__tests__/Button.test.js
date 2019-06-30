import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';

import Button from '../Button';

afterEach(cleanup);

test('loads the button', async () => {
  const { rerender, getByTestId } = render(<Button>Button</Button>);
  expect(getByTestId('button')).toBeInTheDocument();
  expect(getByTestId('button')).toHaveTextContent('Button');
  rerender(<Button>Button Changed</Button>);
  expect(getByTestId('button')).toHaveTextContent('Button Changed');
});

test('Custom class', async () => {
  const { rerender, getByTestId } = render(<Button className="test">Button</Button>);
  expect(getByTestId('button')).toHaveClass('test');
});

test('Click', async () => {
  const mockOnClick = jest.fn();
  const { getByTestId } = render(<Button onClick={mockOnClick}>Button</Button>);
  fireEvent.click(getByTestId('button'));
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});

test('Type variations', async () => {
  const { getByTestId, rerender } = render(<Button>Button</Button>);
  Object.keys(Button.TYPES).forEach((type) => {
    rerender(<Button type={Button.TYPES[type]}>Button</Button>);
    expect(getByTestId('button')).toBeInTheDocument();
  });
});

test('Size variations', async () => {
  const { getByTestId, rerender } = render(<Button>Button</Button>);
  Object.keys(Button.SIZES).forEach((type) => {
    rerender(<Button size={Button.SIZES[type]}>Button</Button>);
    expect(getByTestId('button')).toBeInTheDocument();
  });
});

test('Disabled', async () => {
  const { getByTestId, rerender } = render(<Button disabled>Button</Button>);
  expect(getByTestId('button')).toBeInTheDocument();
});

test('Ref', async () => {
  const mockRef = jest.fn();
  const { getByTestId } = render(<Button innerRef={mockRef}>Button</Button>);
  fireEvent.click(getByTestId('button'));
  expect(mockRef).toHaveBeenCalledTimes(1);
});
