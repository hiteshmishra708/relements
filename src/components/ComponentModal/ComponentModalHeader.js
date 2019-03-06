import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import CloseIcon from 'icons/close.svg';
import styles from './ComponentModalHeader.scss';

const ComponentModalHeader = ({ children, onClose, onSave }) => {
  return (
    <div className={styles.modalHeader}>
      <div className={styles.leftColumn}>
        <Icon onClick={onClose} className={styles.icon} src={{ default: CloseIcon }} />
        {children}
      </div>
      <div className={styles.rightColumn}>
        <div onClick={onSave} className={styles.saveButton}>
          Save
        </div>
      </div>
    </div>
  );
};

ComponentModalHeader.propTypes = {
  children: PropTypes.string,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
};

export default ComponentModalHeader;
