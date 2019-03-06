import React from 'react';
import { storiesOf } from '@storybook/react';

import Radio from './Radio';

storiesOf('RadioInput', module).add('Single', () => {
  const story = <Radio label="Node Type" options={[{ title: 'test' }, { title: 'test2' }]} onChange={console.log} />;
  return story;
});
