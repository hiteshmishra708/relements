import React from 'react';
import { storiesOf } from '@storybook/react';

import DropdownSearch from './DropdownSearch';

const OPTIONS = [{ title: 'AWESOME' }, { title: 'YO' }, { title: 'AWESOME2' }, { title: 'YO2' }];

const VALUE = { text: 'AWESOME' };

storiesOf('DropdownSearch', module)
  .add('Single', () => {
    const story = (
      <div>
        <DropdownSearchTest />
      </div>
    );
    return story;
  })
  .add('Create', () => {
    const story = (
      <div>
        <DropdownSearchTest allowCreate />
      </div>
    );
    return story;
  })
  .add('Clearable', () => {
    const story = (
      <div>
        <DropdownSearchTest allowClear />
      </div>
    );
    return story;
  });

class DropdownSearchTest extends React.Component {
  state = {
    value: undefined,
  };

  render() {
    return (
      <DropdownSearch
        placeholder="Search"
        options={OPTIONS}
        optionKey="title"
        value={this.state.value}
        onChange={value => this.setState({ value }, () => console.log(this.state))}
        allowCreate={this.props.allowCreate}
        allowClear={this.props.allowClear}
      />
    );
  }
}
