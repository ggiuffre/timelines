import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

const mockItemsArray = [
  {
    _id: 123,
    name: 'SomeLibrary',
    type: 'library',
    birth: 1861,
    tags: ['SomeLibrary', 'libraries', 'some other tag']
  },
  {
    _id: 456,
    name: 'Some Language',
    type: 'language',
    birth: 1860,
    tags: ['Some Language', 'languages', 'some other tag']
  },
  {
    _id: 789,
    name: 'something-else',
    type: 'other',
    birth: 1999,
    tags: ['something-else', 'some tag']
  }
];

jest.spyOn(global, 'fetch').mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockItemsArray)
  })
);

test('renders a form', () => {
  const app = render(<App />);

  expect(app.getByRole('form')).toBeInTheDocument();
  expect(app.getByRole('form')).toHaveAttribute('id');
  expect(app.getByRole('combobox')).toBeInTheDocument();
});

test('renders a list of items', () => {
  const app = render(<App />);

  expect(app.getByRole('list')).toBeInTheDocument();
  expect(app.getByRole('list')).toHaveClass('Timeline');
});

global.fetch.mockRestore();
