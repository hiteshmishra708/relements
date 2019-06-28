import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.scss';

/**
 * Button component. Renders a button
 * based on type and size. Uses the children prop
 * to render the contents of the button.
 */
const Button = ({
  className, type, size, disabled, onClick, innerRef, children,
}) => {
  /**
   * Get the styles classname corresponding to the type prop
   * @returns {string} classname of the type styles to be applied
   */
  const getTypeClassName = () => {
    switch (type) {
      case Button.TYPES.PRIMARY:
        return styles.primary;
      case Button.TYPES.SECONDARY:
        return styles.secondary;
      case Button.TYPES.OUTLINE:
        return styles.outline;
      case Button.TYPES.GREY:
        return styles.grey;
      case Button.TYPES.WARNING:
        return styles.warning;
      case Button.TYPES.YELLOW:
        return styles.yellow;
      default:
        return '';
    }
  };

  /**
   * Get the styles classname corresponding to the size prop
   * @returns {string} classname of the size styles to be applied
   */
  const getSizeClassName = () => {
    switch (size) {
      case Button.SIZES.BIG:
        return styles.big;
      case Button.SIZES.MEDIUM:
        return styles.medium;
      case Button.SIZES.SMALL:
        return styles.small;
      default:
        return '';
    }
  };

  return (
    <button
      type="button"
      disabled={disabled}
      ref={innerRef}
      onClick={onClick}
      className={`${styles.button} ${getTypeClassName()} ${getSizeClassName()} ${className}`}
    >
      {children}
    </button>
  );
};

Button.SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  BIG: 'big',
};

Button.TYPES = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINE: 'outline',
  GREY: 'grey',
  WARNING: 'warning',
  YELLOW: 'yellow',
};

Button.propTypes = {
  /** The classname to appended to the outermost element */
  className: PropTypes.string,
  /** The type of the button (primary, secondary, grey etc.) */
  type: PropTypes.oneOf([
    Button.TYPES.DEFAULT,
    Button.TYPES.PRIMARY,
    Button.TYPES.SECONDARY,
    Button.TYPES.OUTLINE,
    Button.TYPES.GREY,
    Button.TYPES.WARNING,
    Button.TYPES.YELLOW,
  ]),
  /** The size of the button (small/medium/big) */
  size: PropTypes.oneOf([Button.SIZES.SMALL, Button.SIZES.MEDIUM, Button.SIZES.LARGE]),
  /** Whether the button is disabled */
  disabled: PropTypes.bool,
  /** OnClick callback */
  onClick: PropTypes.func,
  /** The ref passed down to the outermost DOM element */
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })]),
  /** Children to render inside the button */
  children: PropTypes.element.isRequired,
};

Button.defaultProps = {
  className: '',
  type: Button.TYPES.DEFAULT,
  size: Button.SIZES.MEDIUM,
  disabled: false,
  onClick: () => {},
};

Button.classNames = {
  $prefix: 'world!',
  '$prefix-child': 'world!',
};

export default Button;
