import React from 'react';
import { storiesOf } from '@storybook/react';

import Text from './Text';

const OPTIONS = [];

const VALUE = '';

storiesOf('TextInput', module).add('Single', () => {
  const story = (
    <div>
      <Text label="Sample Input" error="try again" value={VALUE} onChange={console.log} />
    </div>
  );
  return story;
});
