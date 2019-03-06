import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';

storiesOf('Button Component', module)
  .add('Default', () => {
    const story = <Button> This is a button </Button>;
    return story;
  })
  .add('Primary', () => {
    const story = <Button primary> This is a button </Button>;
    return story;
  })
  .add('Small', () => {
    const story = <Button size="small"> This is a button </Button>;
    return story;
  });
