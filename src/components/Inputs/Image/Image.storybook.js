import React from 'react';
import { storiesOf } from '@storybook/react';

import Image from './Image';

storiesOf('ImageInput', module)
  .add('Single', () => {
    const story = <Image onChange={console.log} />;
    return story;
  })
  .add('Multiple', () => {
    const story = <Image onChange={console.log} multiple />;
    return story;
  })
  .add('File', () => {
    const story = <ImageTest />;
    return story;
  });

class ImageTest extends React.Component {
  state = {
    value: '',
  };

  render() {
    return <Image value={this.state.value} onChange={value => this.setState({ value })} type="file" />;
  }
}
