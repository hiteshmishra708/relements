import React from 'react';
import { storiesOf } from '@storybook/react';

import Slider from './Slider';

storiesOf('SliderInput', module).add('Single', () => {
  const story = <Slider start={0}
  end={100}
  step={1}
  value={0}
  onChange={(e) => {console.log('DELAY', e);}}
  placeholder="Add Message"
  label="Message to send when no agent is online" />;
  return story;
});
