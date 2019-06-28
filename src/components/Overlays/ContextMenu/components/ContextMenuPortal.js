import React from 'react';
import { Portal } from 'react-portal';
import PropTypes from 'prop-types';

import useActivify from '@src/src/hooks/useActivify';
import useEscapeKey from '@src/src/hooks/useEscapeKey';
import useEnterKey from '@src/src/hooks/useEnterKey';
import usePositioner from '../hooks/usePositioner';

import styles from './ContextMenuPortal.scss';

const ContextMenuPortal = ({
  active, className, onOverlayClick, children, maxHeight, attachTo, offset,
}) => {
  const contextMenuDOM = React.useRef();
  const { enabled, visible } = useActivify(active);
  const activeClassName = visible ? styles.contextMenuActive : '';
  const position = usePositioner(attachTo, contextMenuDOM, offset);

  useEscapeKey(onOverlayClick);
  useEnterKey(onOverlayClick);

  if (!enabled) return null;
  return (
    <Portal>
      <div className={styles.contextMenuWrapper}>
        <div className={styles.contextMenuOverlay} onClick={onOverlayClick} />
        <div
          className={`${activeClassName} ${styles.contextMenu}`}
          ref={(DOMNode) => {
            if (DOMNode && active) DOMNode.focus();
            contextMenuDOM.current = DOMNode;
          }}
          style={position}
        >
          <div className={`${styles.contextMenuContent} ${className}`} style={{ maxHeight: maxHeight || '300px' }}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};

ContextMenuPortal.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  attachTo: PropTypes.object,
  maxHeight: PropTypes.number,
  onOverlayClick: PropTypes.func,
  offset: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
  }),
};

ContextMenuPortal.defaultProps = {
  offset: {
    left: 0,
    top: 0,
  },
  onOverlayClick: () => {},
};

export default ContextMenuPortal;
