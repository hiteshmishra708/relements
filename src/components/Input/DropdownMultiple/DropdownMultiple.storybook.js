import React from 'react';
import { storiesOf } from '@storybook/react';

import DropdownMultiple from './DropdownMultiple';

const OPTIONS = [];

const VALUE = [{ text: 'AWESOME' }, { text: 'YO' }];

storiesOf('DropdownMultipleInput', module).add('Single', () => {
  const story = (
    <div>
      <DropdownMultiple options={OPTIONS} value={VALUE} onChange={console.log} />
    </div>
  );
  return story;
});
