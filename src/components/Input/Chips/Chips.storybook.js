import React from 'react';
import { storiesOf } from '@storybook/react';

import Chips from './Chips';

storiesOf('ChipsInput', module).add('Single', () => {
  const story = <Chips label="Test Chips Component" value={['test', 'test2']} onChange={console.log} />;
  return story;
});
