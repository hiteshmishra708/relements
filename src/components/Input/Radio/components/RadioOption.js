import React from 'react';
import PropTypes from 'prop-types';

import styles from './RadioOption.scss';

const RadioOption = ({
  label, onChange, value, innerRef, className,
}) => {
  const selectedClassName = value ? styles.selected : '';
  const selectedCustomClassName = value ? 'selected' : '';
  return (
    <div
      ref={innerRef}
      className={`${styles.radioOption} ${className} ${selectedClassName} ${selectedCustomClassName}`}
      onClick={e => onChange(!value, e)}
    >
      <div className={`${styles.radioOptionBox} ${value ? styles.radioOptionBoxSelected : ''}`}>
        <div className={`${styles.radioOptionBoxTick} ${value ? styles.radioOptionBoxTickSelected : ''}`} />
      </div>
      <span className={`${styles.radioOptionText} ${className}-text ${selectedClassName} ${selectedCustomClassName}`}>
        {label}
      </span>
    </div>
  );
};

RadioOption.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  innerRef: PropTypes.func,
};

export default RadioOption;
