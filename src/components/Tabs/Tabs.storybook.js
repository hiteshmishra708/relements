import React from 'react';
import { storiesOf } from '@storybook/react';
import Docs from './Tabs.mdx';

storiesOf('UI/Tabs', module).add('Documentation', () => {
  return <Docs />;
});
