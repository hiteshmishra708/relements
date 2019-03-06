import React from 'react';
import { storiesOf } from '@storybook/react';

import Checkbox from './Checkbox';

storiesOf('CheckboxInput', module).add('Single', () => {
  const story = (
    <Checkbox
      label="Node Type"
      value={[{ title: 'test2' }]}
      options={[{ title: 'test' }, { title: 'test2' }]}
      onChange={console.log}
    />
  );
  return story;
});
