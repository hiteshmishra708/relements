import React from 'react';
import { storiesOf } from '@storybook/react';

import Time from './Time';

storiesOf('TimeInput', module).add('Single', () => {
  const story = <TimeWrapper />;
  return story;
});

class TimeWrapper extends React.Component {
  state = {
    value: undefined,
  };

  render() {
    return (
      <Time
        label="Select Time"
        placeholder="Select..."
        value={this.state.value}
        onChange={value => this.setState({ value })}
      />
    );
  }
}
