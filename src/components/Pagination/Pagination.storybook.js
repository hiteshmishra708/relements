import React from 'react';
import { storiesOf } from '@storybook/react';
import { specs } from 'storybook-addon-specifications';

import Pagination from './Pagination';

storiesOf('Pagination Component', module).add('Default', () => {
  const story = <Pagination />;
  return story;
});
