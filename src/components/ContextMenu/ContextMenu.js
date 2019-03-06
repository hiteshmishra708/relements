import React from 'react';
import { Portal } from 'react-portal';
import PropTypes from 'prop-types';
import { Activify } from 'decorators';
import { KEY_CODES } from 'constants/key_codes';
import styles from './ContextMenu.scss';

@Activify()
export default class ContextMenu extends React.Component {
  state = {
    position: {},
  };

  componentDidMount() {
    document.addEventListener('keyup', this._handleKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this._handleKeyUp);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      // we wait for it to appear and get the right dimensions
      this._positionContextMenu();
    }
  }

  render() {
    return <Portal>{this.renderPortalContainer()}</Portal>;
  }

  renderPortalContainer() {
    const position = this.state.position;
    const activeClassName = this.props.active ? styles.contextMenuActive : '';
    return (
      <div className={styles.contextMenuWrapper}>
        <div className={styles.contextMenuOverlay} onClick={this.props.onOverlayClick} />
        <div
          className={`${activeClassName} ${styles.contextMenu}`}
          ref={DOMNode => {
            if (DOMNode && this.props.active) DOMNode.focus();
            this._contextMenu = DOMNode;
          }}
          style={position}
        >
          <div
            className={`${styles.contextMenuContent} ${this.props.className}`}
            style={{ maxHeight: this.props.maxHeight || '300px' }}
          >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

  _positionContextMenu = () => {
    const rect = this.props.attachTo.getBoundingClientRect();
    const contextMenuRect = this._contextMenu.getBoundingClientRect();
    const position = {
      top: rect.top + this.props.offset.top,
      left:
        this.props.offset.xMode === 'LEFT' ? rect.left + this.props.offset.left : rect.right + this.props.offset.left,
    };

    let diff = window.innerWidth - (rect.right + contextMenuRect.width);
    if (diff < 0) {
      position.left += diff;
    } else {
      diff = 0;
    }

    this.setState({ position });
  };

  _handleKeyUp = e => {
    if (e.keyCode === KEY_CODES.ESC) {
      this.props.onOverlayClick();
    } else if (e.keyCode === KEY_CODES.ENTER) {
      this.props.onOverlayClick();
    }
  };
}

ContextMenu.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  attachTo: PropTypes.object,
  onOverlayClick: PropTypes.func,
  offset: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
  }),
};

ContextMenu.defaultProps = {
  offset: {
    left: 0,
    top: 0,
  },
  onOverlayClick: () => {},
};
