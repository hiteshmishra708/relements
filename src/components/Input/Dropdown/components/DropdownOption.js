import React from 'react';
import PropTypes from 'prop-types';

import styles from './DropdownOption.scss';

const DropdownOption = ({
  children, onClick, selected, innerRef, created, value,
}) => {
  return (
    <div
      ref={innerRef}
      className={`${styles.dropdownOption} ${selected ? styles.dropdownOptionSelected : ''}`}
      onClick={() => onClick(value)}
    >
      {created ? (
        <span
          className={`${styles.dropdownOptionText} ${styles.dropdownOptionTextCreate} ${
            selected ? styles.dropdownOptionSelected : ''
          }`}
        >
          + Create
          {' '}
          <em>
"
            {children}
"
          </em>
        </span>
      ) : (
        <span className={`${styles.dropdownOptionText} ${selected ? styles.dropdownOptionSelected : ''}`}>
          {children}
        </span>
      )}
    </div>
  );
};

DropdownOption.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  innerRef: PropTypes.func,
};

export default DropdownOption;
