import React from 'react';
import { storiesOf } from '@storybook/react';

import DatePicker2 from './DatePicker';
import DatePicker from './DateRanges';

storiesOf('Inputs/Date', module)
  .add('Single', () => {
    const story = <DatePicker2 />;
    return story;
  })
  .add('Range', () => {
    const story = <DateWrapper mode="range" />;
    return story;
  });

class DateWrapper extends React.Component {
  state = {
    value: {
      startDate: new Date(),
      endDate: new Date(),
    },
  };

  render() {
    return (
      <DatePicker
        label="Select Date"
        placeholder="Select..."
        value={this.state.value}
        onChange={value => this.setState({ value })}
        minDate={new Date()}
      />
    );
  }
}
