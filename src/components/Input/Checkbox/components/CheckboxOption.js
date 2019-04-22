import React from 'react';
import PropTypes from 'prop-types';

import TickIcon from 'icons/checkmark.svg';
import Icon from 'components/Icon';

import styles from './CheckboxOption.scss';

const CheckboxOption = ({
  label, onChange, value, innerRef, className,
}) => {
  const selectedClassName = value ? styles.selected : '';
  const selectedCustomClassName = value ? 'selected' : '';
  return (
    <div
      ref={innerRef}
      className={`${styles.checkboxOption} ${className} ${selectedClassName} ${selectedCustomClassName}`}
      onClick={e => onChange(!value, e)}
    >
      <div className={`${styles.checkboxOptionBox} ${className}-box ${selectedClassName} ${selectedCustomClassName}`}>
        <Icon
          className={`${
            styles.checkboxOptionBoxTick
          } ${className}-box-tick ${selectedClassName} ${selectedCustomClassName}`}
          src={TickIcon}
        />
      </div>
      <span
        className={`${styles.checkboxOptionText} ${className}-text ${selectedClassName} ${selectedCustomClassName}`}
      >
        {label}
      </span>
    </div>
  );
};

CheckboxOption.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  innerRef: PropTypes.func,
};

export default CheckboxOption;
