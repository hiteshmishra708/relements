import React from 'react';
import { Portal } from 'react-portal';
import PropTypes from 'prop-types';

import useActivify from '@src/src/hooks/useActivify';
import useEscapeKey from '@src/src/hooks/useEscapeKey';
import useEnterKey from '@src/src/hooks/useEnterKey';

import styles from './Modal.scss';
import ModalHeader from './components/ModalHeader';

const Modal = ({
  onClose, onEnter, className, children, noOverlay, active,
}) => {
  const { enabled, visible } = useActivify(active);
  const activeClassName = visible ? styles.modalActive : '';

  useEscapeKey(onClose);
  useEnterKey(onEnter);

  if (!enabled) return null;
  return (
    <Portal>
      <div className={`${styles.modalWrapper}`}>
        {noOverlay ? null : <div className={`${styles.modalOverlay} ${activeClassName}`} onClick={onClose} />}
        <div className={`${styles.modal} ${activeClassName} ${className}`}>{children}</div>
      </div>
    </Portal>
  );
};

Modal.Header = ModalHeader;

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  onEnter: PropTypes.func,
  active: PropTypes.bool,
  className: PropTypes.string,
  noOverlay: PropTypes.bool,
};

Modal.defaultProps = {
  onClose: () => {},
};

export default Modal;
