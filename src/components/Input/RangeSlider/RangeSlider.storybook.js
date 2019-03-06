import React from 'react';
import { storiesOf } from '@storybook/react';

import RangeSlider from './RangeSlider';

storiesOf('RangeSliderInput', module).add('Single', () => {
  return <RangeSliderTest />;
});

class RangeSliderTest extends React.Component {
  state = {
    value: [0, 100],
  };

  render() {
    return (
      <RangeSlider
        start={0}
        end={1000}
        step={100}
        value={this.state.value}
        onChange={console.log}
        placeholder="Add Message"
        label="Message to send when no agent is online"
      />
    );
  }
}
