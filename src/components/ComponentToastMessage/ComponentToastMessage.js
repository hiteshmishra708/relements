import React from 'react';
import { Portal } from 'react-portal';
import PropTypes from 'prop-types';
import { Activify } from 'decorators';
import { KEY_CODES } from 'constants/key_codes';
import styles from './ComponentToastMessage.scss';

@Activify()
export default class ComponentToastMessage extends React.Component {
  componentDidMount() {
    document.addEventListener('keyup', this._handleKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this._handleKeyUp);
  }

  render() {
    return <Portal>{this.renderPortalContainer()}</Portal>;
  }

  renderPortalContainer() {
    const activeClassName = this.props.active ? styles.toastActive : '';
    return (
      <div className={`${styles.toastWrapper}`}>
        <div className={`${styles.toastOverlay} ${activeClassName}`} onClick={this.props.onOverlayClick} />
        <div className={`${styles.toast} ${activeClassName} ${this.props.className}`}>{this.props.children}</div>
      </div>
    );
  }

  _handleKeyUp = e => {
    if (e.keyCode === KEY_CODES.ESC) {
      this.props.onOverlayClick && this.props.onOverlayClick();
    } else if (e.keyCode === KEY_CODES.ENTER) {
      this.props.onEnter && this.props.onEnter();
    }
  };
}

ComponentToastMessage.propTypes = {
  children: PropTypes.node,
  onOverlayClick: PropTypes.func,
  onEnter: PropTypes.func,
  active: PropTypes.bool,
  className: PropTypes.string,
};

ComponentToastMessage.defaultProps = {
  onOverlayClick: () => {},
};
