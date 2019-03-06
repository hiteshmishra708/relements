import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import Icon from 'components/Icon';
import ContextMenu from './ContextMenu';
import styles from './ContextMenu.scss';

export default class ContextMenuIcon extends React.Component {
  state = {
    active: false,
  };

  render() {
    const {
      className, offset, children, title, size,
    } = this.props;
    return (
      <React.Fragment>
        <ContextMenu
          active={this.state.active}
          attachTo={this._contextMenuIcon}
          offset={offset}
          onOverlayClick={this._handleOverlayClick}
        >
          {typeof children === 'function' ? children(this._handleOverlayClick) : children}
        </ContextMenu>
        <Button
          size={size}
          style={{ cursor: 'pointer' }}
          onClick={this._handleClick}
          className={className}
          innerRef={(DOMElement) => {
            this._contextMenuIcon = DOMElement;
          }}
        >
          {title}
          {' '}
          <Icon className={styles.contextMenuButtonIcon} iconType="angle-down" />
        </Button>
      </React.Fragment>
    );
  }

  _handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ active: true });
  };

  _handleOverlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ active: false });
  };
}

ContextMenu.propTypes = {
  className: PropTypes.string,
  onOverlayClick: PropTypes.func,
  children: PropTypes.node,
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
