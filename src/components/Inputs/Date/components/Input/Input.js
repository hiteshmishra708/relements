import React from 'react';
import dayjs from 'dayjs';

import styles from './Input.scss';

function Input({ label, value, className, disabled, onFocus, focused, compare}) {
  const date = dayjs.isDayjs(value)
    ? dayjs(value).format('DD MMM, YYYY')
    : '';
  const focusedClassName = focused ? styles.focused : '';
  const compareClassName = compare ? styles.compare : '';
  return (
    <div
      className={`${styles.input} ${className} ${compareClassName} ${focusedClassName}`}
    >
      <span className={`${styles.inputLabel}`}>{label}</span>
      <input
        onFocus={onFocus}
        value={date}
        className={`${styles.inputField}`}
        placeholder="Selecting"
        disabled={disabled}
      />
    </div>
  );
}

export default Input;
