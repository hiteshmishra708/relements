import React from 'react';
import { storiesOf } from '@storybook/react';
import { specs } from 'storybook-addon-specifications';

import Table from './Table';

const TABLE = {
  columns: [
    {
      title: 'Rating',
      width: '100px',
    },
    {
      title: 'Comment',
    },
    {
      title: 'Task',
      width: '15%',
    },
    {
      title: 'Reason',
      width: '15%',
    },
    {
      title: 'View Chat',
      width: '100px',
    },
  ],
  data: [
    [
      { content: 'hello', value: 'hello' },
      { content: 'this', value: 'this' },
      { content: 'is', value: 'is' },
      { content: 'an', value: 'an' },
      { content: 'item', value: 'item' },
    ],
  ],
};

storiesOf('Table', module).add('Default', () => {
  const story = <Table sortable sortKey={'title'} sortOrder={-1} columns={TABLE.columns} data={TABLE.data} />;
  return story;
});
