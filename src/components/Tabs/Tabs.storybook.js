import React from 'react';
import { storiesOf } from '@storybook/react';
import Tabs from './Tabs';

storiesOf('Tabs', module).add('Default', () => {
  const story = (
    <Tabs
      value="title-2"
      items={[
        { title: 'Test Title', path: 'title-1', iconType: 'bot-says' },
        { title: 'Test Title', path: 'title-2', iconType: 'bot-says' },
      ]}
    />
  );
  return story;
});
