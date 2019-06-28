import React from 'react';
import { storiesOf } from '@storybook/react';
import Docs from './Button.mdx';
import Button from './Button';

storiesOf('UI/Button', module)
  .add('Documentation', () => <Docs />)
  .add('Playground', () => <Button />);
