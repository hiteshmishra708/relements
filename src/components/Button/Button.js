import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.scss';

const Button = ({
  className,
  children,
  size,
  primary,
  secondary,
  onClick,
  innerRef,
  disabled,
  outline,
  warning,
  yellow,
  grey,
}) => {
  const primaryClassName = !disabled && primary ? styles.primary : '';
  const secondaryClassName = !disabled && secondary ? styles.secondary : '';
  const outlineClassName = !disabled && outline ? styles.outline : '';
  const greyClassName = !disabled && grey ? styles.grey : '';
  const warningClassName = !disabled && warning ? styles.warning : '';
  const yellowClassName = !disabled && yellow ? styles.yellow : '';
  const disabledClassName = disabled ? styles.disabled : '';
  const smallClassName = size === 'small' ? styles.small : '';
  const bigClassName = size === 'big' ? styles.big : '';

  return (
    <button
      disabled={disabled}
      ref={innerRef}
      onClick={onClick}
      className={`${styles.button} ${className} ${primaryClassName} ${secondaryClassName}
        ${smallClassName} ${bigClassName} ${disabledClassName} ${outlineClassName}
        ${warningClassName} ${yellowClassName} ${greyClassName}
      `}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  outline: PropTypes.bool,
  onClick: PropTypes.func,
  innerRef: PropTypes.func,
  disabled: PropTypes.bool,
  warning: PropTypes.bool,
  yellow: PropTypes.bool,
  grey: PropTypes.bool,
};

export default Button;
