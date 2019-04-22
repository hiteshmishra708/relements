import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import AngleDownIcon from 'icons/angle-down.svg';
import styles from './TextInput.scss';

export const TextInput = ({
  className,
  onKeyDown,
  onFocus,
  onBlur,
  onMouseDown,
  innerRef,
  value,
  onChange,
  focused,
  error,
  placeholder = 'Type here...',
  inputRef,
  disabled,
}) => {
  const focusedClassName = focused ? styles.focused : '';
  const errorClassName = error ? styles.error : '';
  const [textValue, setTextValue] = useState();

  const handleChange = (e) => {
    onChange(e.target.value);
    setTextValue(e.target.value);
  };

  const renderInput = () => (
    <input
      disabled={disabled}
      value={textValue}
      onChange={handleChange}
      placeholder={placeholder}
      type="text"
      ref={inputRef}
    />
  );

  useEffect(() => {
    setTextValue(value);
  }, [value]);

  return (
    <div
      ref={innerRef}
      tabIndex="0"
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseDown={onMouseDown}
      className={`${styles.inputWrapper} ${className} ${focusedClassName} ${errorClassName}`}
    >
      <div className={styles.input}>{renderInput()}</div>
      <Icon src={AngleDownIcon} />
    </div>
  );
};

TextInput.propTypes = {
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onMouseDown: PropTypes.func,
  innerRef: PropTypes.object,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  focused: PropTypes.bool,
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  inputRef: PropTypes.object,
};
