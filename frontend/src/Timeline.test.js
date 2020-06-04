import React from 'react';
import { render } from '@testing-library/react';
import Timeline from './Timeline';

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

test('renders a timeline as a list', () => {
  const { getAllByRole } = render(<Timeline techs={mockItemsArray} />);

  const timeline = getAllByRole('list')[0];
  expect(timeline).toHaveClass('Timeline');
});

test('renders a list of technologies', () => {
  const { getAllByRole } = render(<Timeline techs={mockItemsArray} />);

  const timeline = getAllByRole('list')[0];
  const technologies = timeline.children;
  expect(technologies.length).toBe(mockItemsArray.length);
  mockItemsArray.forEach((item, i) => {
    expect(technologies[i]).toHaveClass('Technology');
    expect(technologies[i].textContent).toContain(item.name);
    expect(technologies[i].textContent).toContain(item.birth.toString());
    expect(technologies[i]).toHaveClass((i % 2) ? 'left' : 'right');
  });
});
