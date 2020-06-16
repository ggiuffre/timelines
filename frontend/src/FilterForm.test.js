import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import FilterForm from './FilterForm';

const mockTags = ['SomeLibrary', 'libraries', 'some other tag',
  'Some Language', 'languages', 'something-else', 'some tag'];

beforeEach(() => {
  jest.spyOn(window, 'fetch').mockImplementation(endpoint =>
    Promise.resolve({
      json: () => Promise.resolve(mockTags)
    })
  )
});

afterEach(() => {
  window.fetch.mockRestore();
});



describe('A FilterForm component', () => {
  it('renders a form', () => {
    const types = {
      languages: 'yup',
      libraries: 'yup',
      softwares: 'yup'
    };
    const form = render(<FilterForm
        topic=''
        types={types}
        updateTopic={() => {}}
        updateTypes={() => {}}
        updateTimeline={() => {}}
        fullPage={true}
      />);

    expect(form.getByRole('form')).toBeInTheDocument();
    expect(form.getByRole('combobox')).toBeInTheDocument();
    expect(form.getAllByRole('checkbox').length).toBe(3);
    expect(form.getByRole('button')).toBeInTheDocument();
  });

  it('attempts to fetch data from the back-end', () => {
    const types = {
      languages: 'yup',
      libraries: 'yup',
      softwares: 'yup'
    };
    const form = render(<FilterForm
        topic=''
        types={types}
        updateTopic={() => {}}
        updateTypes={() => {}}
        updateTimeline={() => {}}
        fullPage={true}
      />);

    expect(window.fetch).toHaveBeenCalledTimes(1);
  });
});
