import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from './Button';

storiesOf('Internal|HSL Builder/Button', module).add('Basic', () => {
  const story = <Button />;
  return story;
});
