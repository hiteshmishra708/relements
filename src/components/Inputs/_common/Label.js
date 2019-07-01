import React from 'react';
import PropTypes from 'prop-types';
import styles from './Label.scss';

export const Label = ({
  children, className, focused, error,
}) => {
  if (!children) return null;
  const focusedClassName = focused ? styles.focused : '';
  const errorClassName = error ? styles.error : '';
  return <span className={`${styles.label} ${className} ${focusedClassName} ${errorClassName}`}>{children}</span>;
};

Label.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  focused: PropTypes.bool,
  error: PropTypes.bool,
};