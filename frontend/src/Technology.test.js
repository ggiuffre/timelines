import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Technology from './Technology';

const mockItem = {
  _id: 123,
  name: 'SomeLibrary',
  type: 'library',
  birth: 1861,
  tags: ['SomeLibrary', 'libraries', 'some other tag']
};

describe('', () => {
  const { getAllByRole, getByRole } = render(<Technology
    name={mockItem.name}
    birth={mockItem.birth}
    tags={mockItem.tags}
    side="left"
    />);
  const technology = getAllByRole('listitem')[0];

  test('renders a technology', () => {
    expect(technology).toHaveClass('Technology');
  });

  test('has known content', () => {
    expect(technology.textContent).toMatch(mockItem.name);
    expect(technology.textContent).toMatch(mockItem.birth.toString());
    mockItem.tags.forEach(tag => {
      expect(technology.textContent).toMatch(tag);
    });
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

// test('has no visible tags until clicked or hovered', () => {
//   const { getAllByRole, getByRole } = render(<Technology
//     name={mockItem.name}
//     birth={mockItem.birth}
//     tags={mockItem.tags}
//     side="left"
//     />);

//   const tagsList = getByRole('list');
//   expect(tagsList).not.toBeVisible();
// });

// test('has visible tags when clicked', async () => {
//   const { getAllByRole, getByRole } = render(<Technology
//     name={mockItem.name}
//     birth={mockItem.birth}
//     tags={mockItem.tags}
//     side="left"
//     />);
//   const technology = getAllByRole('listitem')[0];

//   fireEvent.click(technology);
//   await waitFor(() => getByRole('list'));

//   const tagsList = getByRole('list');
//   expect(tagsList).toBeVisible();
// });
