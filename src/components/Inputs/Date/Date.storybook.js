import React from 'react';
import { storiesOf } from '@storybook/react';

import DatePicker from './Date';

storiesOf('DateInput', module)
  .add('Single', () => {
    const story = <DateWrapper />;
    return story;
  })
  .add('Range', () => {
    const story = <DateWrapper mode="range" />;
    return story;
  });

class DateWrapper extends React.Component {
  state = {
    value: undefined,
  };

  render() {
    console.log(this.state.value);
    console.log(this.props.mode);
    return (
      <DatePicker
        mode={this.props.mode || 'single'}
        label="Select Date"
        placeholder="Select..."
        value={this.state.value}
        onChange={value => this.setState({ value })}
      />
    );
  }
}
