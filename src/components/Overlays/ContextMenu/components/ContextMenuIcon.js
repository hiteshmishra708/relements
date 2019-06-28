import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/UI/Icon';

import ContextMenuPortal from './ContextMenuPortal';

export default class ContextMenuIcon extends React.Component {
  state = {
    active: false,
  };

  render() {
    const {
      className, offset, children, iconType = 'circle-more', iconComponent, maxMenuHeight,
    } = this.props;
    return (
      <React.Fragment>
        {iconComponent ? (
          React.cloneElement(iconComponent, {
            onClick: this._handleClick,
            ref: (DOMElement) => {
              this._contextMenuIcon = DOMElement;
            },
          })
        ) : (
          <Icon
            style={{ cursor: 'pointer' }}
            onClick={this._handleClick}
            src={iconType}
            className={className}
            innerRef={(DOMElement) => {
              this._contextMenuIcon = DOMElement;
            }}
          />
        )}
        <ContextMenuPortal
          active={this.state.active}
          attachTo={this._contextMenuIcon}
          offset={offset}
          onOverlayClick={this._handleOverlayClick}
          maxHeight={maxMenuHeight}
        >
          {typeof children === 'function' ? children(this._handleOverlayClick) : children}
        </ContextMenuPortal>
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

ContextMenuIcon.propTypes = {
  className: PropTypes.string,
  onOverlayClick: PropTypes.func,
  children: PropTypes.node,
  offset: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
  }),
};

ContextMenuIcon.defaultProps = {
  offset: {
    left: 0,
    top: 0,
  },
};
