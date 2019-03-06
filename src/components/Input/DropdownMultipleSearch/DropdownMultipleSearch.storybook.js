import React from 'react';
import { storiesOf } from '@storybook/react';

import DropdownMultipleSearch from './DropdownMultipleSearch';

const OPTIONS = [{ text: 'AWESOME' }, { text: 'YO' }, { text: 'AWESOME2' }, { text: 'YO2' }];

const VALUE = [{ text: 'AWESOME' }, { text: 'YO' }];

storiesOf('DropdownMultipleSearch', module).add('Single', () => {
  const story = (
    <div>
      <DropdownMultipleTest />
    </div>
  );
  return story;
});

class DropdownMultipleTest extends React.Component {
  state = {
    value: [],
  };

  render() {
    return (
      <DropdownMultipleSearch options={OPTIONS} value={this.state.value} onChange={value => this.setState({ value })} />
    );
  }
}
