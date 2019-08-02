import React from 'react';
import { storiesOf } from '@storybook/react';

import Text from './Text';

storiesOf('Internal|HSL Builder/Text', module).add('Basic', () => {
  const story = <Text />;
  return story;
});
