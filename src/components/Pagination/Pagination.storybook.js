import React from 'react';
import { storiesOf } from '@storybook/react';
import Pagination from './Pagination';

storiesOf('Pagination Component', module).add('Default', () => {
  const story = <Pagination />;
  return story;
});
