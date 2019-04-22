import React from 'react';
import { Portal } from 'react-portal';
import PropTypes from 'prop-types';
import { Activify } from 'decorators';

import styles from './DropdownOptions.scss';

@Activify()
class DropdownOptions extends React.Component {
  render() {
    return <Portal>{this.renderPortalContainer()}</Portal>;
  }

  renderPortalContainer() {
    const activeClassName = this.props.active ? styles.active : '';
    const focusedClassName = this.props.focused ? styles.focused : '';
    const rect = this.props.attachTo.current.getBoundingClientRect();
    let reverseMode = this.props.reverseMode;

    const position = {
      top: rect.bottom + window.scrollY,
      left: rect.left,
      width: rect.width,
    };

    if (rect.bottom + 150 >= window.innerHeight || reverseMode) {
      reverseMode = true;
      position.top = 'none';
      position.bottom = window.innerHeight - rect.top + window.scrollY - 1;
    }

    const reverseModeClassName = reverseMode ? styles.reverse : '';

    return (
      <div className={`${styles.dropdownOptionsWrapper}`}>
        <div className={styles.dropdownOptionsOverlay} onClick={this.props.onClose} />
        <div
          style={position}
          className={`${styles.dropdownOptions} ${activeClassName} ${focusedClassName} ${reverseModeClassName}`}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
DropdownOptions.propTypes = {
  children: PropTypes.node,
  attachTo: PropTypes.object,
  onClose: PropTypes.func,
  getParentRef: PropTypes.func,
  active: PropTypes.bool,
  focused: PropTypes.bool,
  reverseMode: PropTypes.bool,
};

export default DropdownOptions;
