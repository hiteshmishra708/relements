import React from 'react';
import { Portal } from 'react-portal';
import PropTypes from 'prop-types';

import useActivify from '@src/src/hooks/useActivify';
import useEscapeKey from '@src/src/hooks/useEscapeKey';

import DrawerHeader from './components/DrawerHeader';
import styles from './Drawer.scss';

const Drawer = ({
  children,
  className,
  active,
  position,
  offset,
  attachTo,
  width,
  zIndex,
  noDisable,
  onClose,
  noOverlay,
}) => {
  const { enabled, visible } = useActivify(active);
  const activeClassName = visible ? styles.drawerActive : '';
  const placementClassName = position === 'LEFT' ? styles.left : '';
  const noDisableClassName = noDisable ? styles.noDisable : '';
  const transformAmount = position === 'LEFT' ? -1 * (width + offset) : width + offset;
  const style = {};
  style.zIndex = zIndex;
  style.left = position === 'LEFT' ? offset : 'auto';
  style.right = position === 'LEFT' ? 'auto' : offset;

  useEscapeKey(onClose);

  if (!enabled) return null;

  return (
    <Portal node={document && attachTo && document.getElementById(attachTo)}>
      {
        <div className={`${styles.drawerWrapper} ${className}`} style={style}>
          {noOverlay ? null : <div className={`${styles.drawerOverlay} ${activeClassName}`} onClick={onClose} />}
          <div
            style={{ width, transform: `translate3d(${transformAmount}px, 0, 0)` }}
            className={`${styles.drawer} ${placementClassName} ${activeClassName} ${noDisableClassName}`}
          >
            {children}
          </div>
        </div>
      }
    </Portal>
  );
};

Drawer.Header = DrawerHeader;

Drawer.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  active: PropTypes.bool,
  noDisable: PropTypes.bool,
  zIndex: PropTypes.number,
  offset: PropTypes.number,
  className: PropTypes.string,
  position: PropTypes.string,
  noOverlay: PropTypes.bool,
  width: PropTypes.number,
  attachTo: PropTypes.node,
};

Drawer.defaultProps = {
  onClose: () => {},
};

export default Drawer;
