import React from 'react';
import { storiesOf } from '@storybook/react';

import Icon from './Icon';

storiesOf('Icon', module).add('Default', () => {
  const story = (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        paddingTop: 200,
        paddingLeft: 200,
      }}
    >
      <Icon src="invisible" />
    </div>
  );
  return story;
});
