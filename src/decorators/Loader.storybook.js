import React from 'react';
import { storiesOf } from '@storybook/react';

import { Loader } from './index';
import { Loader as LoaderV2 } from './LoaderV2';

@Loader()
class TestLoading extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.activateLoader();
    }, 2000);
  }

  render() {
    return <div>Hello, World</div>;
  }
}

@LoaderV2()
class TestLoadingV2 extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.activateLoader();
    }, 2000);
  }

  render() {
    return <div>Hello, World</div>;
  }
}

storiesOf('LoadingDecorator', module)
  .add('Simple', () => {
    const story = <TestLoading />;
    return story;
  })
  .add('V2', () => {
    const story = <TestLoadingV2 />;
    return story;
  });
