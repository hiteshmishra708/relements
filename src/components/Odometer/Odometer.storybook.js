import React from 'react';
import { storiesOf } from '@storybook/react';

import Odometer from './Odometer';

storiesOf('Odometer').add('Default', () => {
  const story = <OdometerTest />;
  return story;
});

class OdometerTest extends React.Component {
  state = {
    value: 10,
  };

  componentDidMount = () => {
    this._interval = setInterval(() => this.setState({ value: this.state.value + 90 }), 2000);
  };

  componentWillUnmount = () => {
    clearInterval(this._interval);
  };

  render() {
    return (
      <Odometer fontSize={24}>
        {this.state.value}
      </Odometer>
    );
  }
}
