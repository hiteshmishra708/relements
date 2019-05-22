import React from 'react';
import { Portal } from 'react-portal';
import PropTypes from 'prop-types';
// import { Activify } from 'decorators';
import { KEY_CODES } from 'constants/key_codes';
import styles from './ComponentTooltip.scss';

// @Activify()
export default class ComponentTooltip extends React.Component {
  state = {
    position: {},
    tooltipRect: { width: 0 },
    leftDiff: 0,
    rightDiff: 0,
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
      this._positionTooltip();
    } else if (!this.props.attachTo && nextProps.attachTo) {
      this._positionTooltip();
    }
  }

  render() {
    if (!this.props.attachTo) return null;
    return <Portal>{this.renderPortalContainer()}</Portal>;
  }

  renderPortalContainer() {
    const position = this.state.position;
    const activeClassName = this.props.active ? styles.tooltipActive : '';
    const topPositionClassName = this.props.position === 'TOP' ? styles.top : styles.bottom;
    const smallClassName = this.props.tooltipArrowSmall ? styles.small : '';
    return (
      <div className={`${styles.tooltipWrapper} ${this.props.className}-wrapper`}>
        <div
          onClick={this.props.onOverlayClick}
          className={`${styles.tooltipOverlay} ${this.props.className}-overlay`}
        />
        <div
          className={`${activeClassName} ${styles.tooltip}`}
          ref={(DOMNode) => {
            if (DOMNode && this.props.active) DOMNode.focus();
            this._tooltip = DOMNode;
          }}
          style={position}
        >
          <div
            className={`${styles.tooltipArrow} ${topPositionClassName} ${smallClassName} ${this.props.className}-caret`}
            style={{
              left: this.state.leftDiff + -1 * this.state.rightDiff + this.state.tooltipRect.width / 2,
              borderColor: this.props.tooltipArrowColor || '#FFF',
            }}
          />
          <div className={`${styles.tooltipContent} ${topPositionClassName} ${this.props.className}`}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

  _positionTooltip = () => {
    if (!this.props.attachTo || !this._tooltip) return;
    const rect = this.props.attachTo.getBoundingClientRect();
    const tooltipRect = this._tooltip.getBoundingClientRect();
    const position = {};

    if (this.props.position === 'TOP') {
      position.top = rect.top - tooltipRect.height - 10;
      position.left = rect.left - tooltipRect.width / 2 + rect.width / 2;
    } else {
      position.top = rect.bottom + 10;
      position.left = rect.left - tooltipRect.width / 2 + rect.width / 2;
    }

    let leftDiff = rect.left + rect.width / 2 - tooltipRect.width / 2 - 8;
    let rightDiff = window.innerWidth - (rect.left + rect.width / 2 + tooltipRect.width / 2) - 8;
    if (leftDiff < 0) {
      position.left -= leftDiff;
    } else {
      leftDiff = 0;
    }

    if (rightDiff < 0) {
      position.left += rightDiff;
    } else {
      rightDiff = 0;
    }

    if (this.props.offset && this.props.offset.left) {
      position.left += this.props.offset.left;
    }

    if (this.props.offset && this.props.offset.top) {
      position.top += this.props.offset.top;
    }

    this.setState({
      position,
      leftDiff,
      rightDiff,
      tooltipRect,
    });
  };

  _handleKeyUp = (e) => {
    if (e.keyCode === KEY_CODES.ESC) {
      this.props.onOverlayClick();
    } else if (e.keyCode === KEY_CODES.ENTER) {
      this.props.onOverlayClick();
    }
  };
}

ComponentTooltip.propTypes = {
  active: PropTypes.bool,
  tooltipArrowSmall: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  attachTo: PropTypes.object,
  onOverlayClick: PropTypes.func,
  position: PropTypes.string,
  tooltipArrowColor: PropTypes.string,
};

ComponentTooltip.defaultProps = {
  onOverlayClick: () => {},
};
