import React from 'react';
import PropTypes from 'prop-types';

import ComponentTooltip from 'components/ComponentTooltip';

import styles from './WithTooltip.scss';

export default class WithTooltip extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    tooltip: PropTypes.string,
    tooltipPosition: PropTypes.string,
    onClick: PropTypes.func,
    innerRef: PropTypes.func,
  };

  state = {
    tooltipActive: false,
  };

  render() {
    const {
      children, className, onClick, innerRef, tooltip, tooltipPosition = 'TOP',
    } = this.props;
    return (
      <span
        ref={(DOMElement) => {
          this._iconWrapperDOM = DOMElement;
          innerRef && innerRef(DOMElement);
        }}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        onClick={(e) => {
          onClick && onClick(e);
        }}
        className={`${styles.withTooltipWrapper} ${className}`}
      >
        {children}
        {tooltip ? (
          <ComponentTooltip
            active={this.state.tooltipActive}
            position={tooltipPosition}
            attachTo={this._iconWrapperDOM}
            tooltipArrowColor="rgba(0,0,0,0.7)"
            tooltipArrowSmall
          >
            <div className={styles.withTooltip}>{tooltip}</div>
          </ComponentTooltip>
        ) : null}
      </span>
    );
  }

  _handleMouseEnter = () => {
    this._timeout = setTimeout(() => {
      this.setState({ tooltipActive: true });
    }, 300);
  };

  _handleMouseLeave = () => {
    if (this._timeout) clearTimeout(this._timeout);
    this.setState({ tooltipActive: false });
  };
}
