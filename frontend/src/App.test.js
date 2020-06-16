import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from './App';

const mockItemsArray = [{
    _id: 123,
    name: 'SomeLibrary',
    type: 'library',
    birth: 1861,
    tags: ['SomeLibrary', 'libraries', 'some other tag']
  }, {
    _id: 456,
    name: 'Some Language',
    type: 'language',
    birth: 1860,
    tags: ['Some Language', 'languages', 'some other tag']
  }, {
    _id: 789,
    name: 'something-else',
    type: 'software',
    birth: 1999,
    tags: ['something-else', 'some tag']
}];

const mockTags = ['SomeLibrary', 'libraries', 'some other tag',
  'Some Language', 'languages', 'something-else', 'some tag'];

beforeEach(() => {
  jest.spyOn(window, 'fetch').mockImplementation(endpoint => {
    let response;
    if (endpoint.includes('tags'))
      response = mockTags;
    else
      response = mockItemsArray;

    return Promise.resolve({
      json: () => Promise.resolve(response)
    });
  });
});

afterEach(() => {
  window.fetch.mockRestore();
});



describe('An App component', () => {
  it('contains a form', () => {
    const app = render(<App />);

    expect(app.getByRole('form')).toBeInTheDocument();
  });

  it('does not show a timeline, if not requested', () => {
    const app = render(<App />);

    screen.queryAllByRole('list').forEach(renderedList => {
      expect(renderedList).not.toHaveClass('Timeline');
    });
  });

  it('shows a timeline of items, upon request', async () => {
    const app = render(<App />);

    fireEvent.click(screen.getByText('Update'));

    await waitFor(() => screen.getAllByRole('list'));

    expect(screen.getAllByRole('list')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('list')[0]).toHaveClass('Timeline');
  });
});
