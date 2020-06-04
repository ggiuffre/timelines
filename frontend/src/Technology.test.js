import React from 'react';
import { render } from '@testing-library/react';
import Technology from './Technology';

const mockItem = {
  _id: 123,
  name: 'SomeLibrary',
  type: 'library',
  birth: 1861,
  tags: ['SomeLibrary', 'libraries', 'some other tag']
};

test('renders a technology', () => {
  const { getAllByRole } = render(<Technology
    name={mockItem.name}
    birth={mockItem.birth}
    tags={mockItem.tags}
    side="left"
    />);

  const technology = getAllByRole('listitem')[0];
  expect(technology).toHaveClass('Technology');
});

test('has known content', () => {
  const { getAllByRole } = render(<Technology
    name={mockItem.name}
    birth={mockItem.birth}
    tags={mockItem.tags}
    side="left"
    />);

  const technology = getAllByRole('listitem')[0];
  expect(technology.textContent).toMatch(mockItem.name);
  expect(technology.textContent).toMatch(mockItem.birth.toString());
  mockItem.tags.forEach(tag => {
    expect(technology.textContent).toMatch(tag);
  });
});

test('contains a list of tags', () => {
  const { getAllByRole, getByRole } = render(<Technology
    name={mockItem.name}
    birth={mockItem.birth}
    tags={mockItem.tags}
    side="left"
    />);

  const tagsList = getByRole('list');
  expect(tagsList).toHaveClass('tagsList');
  const tags = tagsList.children;
  expect(tags.length).toBe(mockItem.tags.length);
  mockItem.tags.forEach((item, i) => {
    expect(tags[i].textContent).toContain(item);
  });
});
