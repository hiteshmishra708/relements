import React from 'react';
import PropTypes from 'prop-types';

import TickIcon from 'icons/checkmark.svg';
import Icon from 'components/Icon';

import styles from './CheckboxOption.scss';

const CheckboxOption = ({
  children, onClick, selected, innerRef, className,
}) => {
  const selectedClassName = selected ? styles.selected : '';
  const selectedCustomClassName = selected ? 'selected' : '';
  return (
    <div
      ref={innerRef}
      className={`${styles.checkboxOption} ${className} ${selectedClassName} ${selectedCustomClassName}`}
      onClick={e => onClick(!selected, e)}
    >
      <div className={`${styles.checkboxOptionBox} ${className}-box ${selectedClassName} ${selectedCustomClassName}`}>
        <Icon
          className={`${
            styles.checkboxOptionBoxTick
          } ${className}-box-tick ${selectedClassName} ${selectedCustomClassName}`}
          src={{ default: TickIcon }}
        />
      </div>
      <span
        className={`${styles.checkboxOptionText} ${className}-text ${selectedClassName} ${selectedCustomClassName}`}
      >
        {children}
      </span>
    </div>
  );
};

CheckboxOption.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  innerRef: PropTypes.func,
};

export default CheckboxOption;
