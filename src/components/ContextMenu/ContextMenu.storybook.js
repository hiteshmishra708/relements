import React from 'react';
import { storiesOf } from '@storybook/react';

import SampleIcon from 'icons/active.svg';
import ContextMenu from './ContextMenu';
import ContextMenuItem from './ContextMenuItem';
import ContextMenuIcon from './ContextMenuIcon';

// eslint-disable-next-line
storiesOf('ContextMenu', module)
  .add('New', () => {
    const story = <MyComponent />;
    return story;
  })
  .add('Icon', () => {
    const story = (
      <div style={{ float: 'left' }}>
        <ContextMenuIcon offset={{ left: -24, top: 0 }}>
          <ContextMenuItem icon={SampleIcon} iconSize={18} title="Hello" />
          <ContextMenuItem disabled icon={SampleIcon} iconSize={18} title="Hello" />
          <ContextMenuItem icon={SampleIcon} iconSize={18} title="Hello" />
        </ContextMenuIcon>
      </div>
    );
    return story;
  });

class MyComponent extends React.Component {
  state = {
    active: false,
  };

  render() {
    return (
      <div>
        <div
          onClick={() => this.setState({ active: true })}
          ref={(DOMElement) => {
            this._DOMElement = DOMElement;
          }}
          style={{ width: 20, height: 20, backgroundColor: '#F00' }}
        />
        <ContextMenu
          attachTo={this._DOMElement}
          active={this.state.active}
          onOverlayClick={() => this.setState({ active: false })}
        >
          <ContextMenuItem icon={SampleIcon} iconSize={18} title="Hello" />
          <ContextMenuItem disabled icon={SampleIcon} iconSize={18} title="Hello" />
          <ContextMenuItem icon={SampleIcon} iconSize={18} title="Hello" />
        </ContextMenu>
      </div>
    );
  }
}
