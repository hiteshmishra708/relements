import React from 'react';
import { Portal } from 'react-portal';
import PropTypes from 'prop-types';
// import { Activify } from 'decorators';
import { KEY_CODES } from 'constants/key_codes';
import styles from './ComponentDrawer.scss';

// @Activify()
export default class ComponentDrawer extends React.Component {
  componentDidMount() {
    document.addEventListener('keyup', this._handleKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this._handleKeyUp);
  }

  render() {
    const { attachTo } = this.props;
    return (
      <Portal node={document && attachTo && document.getElementById(attachTo)}>{this.renderPortalContainer()}</Portal>
    );
  }

  renderPortalContainer() {
    const { zIndex = 999999999, offset = 0, attachTo } = this.props;

    const activeClassName = this.props.active ? styles.drawerActive : '';
    const placementClassName = this.props.placement === 'LEFT' ? styles.left : '';
    const noDisableClassName = this.props.noDisable ? styles.noDisable : '';
    const transformAmount = this.props.placement === 'LEFT' ? -1 * (this.props.width + offset) : this.props.width + offset;
    const style = {};
    style.zIndex = zIndex;
    style.left = this.props.placement === 'LEFT' ? offset : 'auto';
    style.right = this.props.placement === 'LEFT' ? 'auto' : offset;

    if (attachTo) style.position = 'absolute';

    return (
      <div className={`${styles.drawerWrapper}`} style={style}>
        {this.props.noOverlay ? null : (
          <div className={`${styles.drawerOverlay} ${activeClassName}`} onClick={this.props.onOverlayClick} />
        )}
        <div
          style={{ width: this.props.width, transform: `translate3d(${transformAmount}px, 0, 0)` }}
          className={`${styles.drawer} ${placementClassName} ${activeClassName} ${noDisableClassName}`}
        >
          {this.props.children}
        </div>
      </div>
    );
  }

  _handleKeyUp = (e) => {
    if (e.keyCode === KEY_CODES.ESC && this.props.onOverlayClick) {
      this.props.onOverlayClick();
    }
  };
}

ComponentDrawer.propTypes = {
  children: PropTypes.node,
  onOverlayClick: PropTypes.func,
  active: PropTypes.bool,
  noDisable: PropTypes.bool,
  zIndex: PropTypes.number,
  offset: PropTypes.number,
  placement: PropTypes.string,
  noOverlay: PropTypes.bool,
  width: PropTypes.number,
};

ComponentDrawer.defaultProps = {
  onOverlayClick: () => {},
};
