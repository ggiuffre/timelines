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

test('renders a list of technologies', () => {
  const timeline = render(<Timeline techs={mockItemsArray} />);

  expect(timeline.getByRole('list')).toHaveClass('Timeline');
  const listItems = timeline.getAllByRole('listitem');
  expect(listItems.length).toBe(mockItemsArray.length);
  listItems.forEach((item, i) => {
    expect(item).toHaveClass('Technology');
    expect(item.textContent).toContain(mockItemsArray[i].name);
    expect(item.textContent).toContain(mockItemsArray[i].birth.toString());
  });
});
