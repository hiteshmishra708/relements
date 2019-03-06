import React from 'react';
import PropTypes from 'prop-types';

import { SIZES, BUTTON_TYPES } from 'constants';
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
      case BUTTON_TYPES.PRIMARY:
        return styles.primary;
      case BUTTON_TYPES.SECONDARY:
        return styles.secondary;
      case BUTTON_TYPES.OUTLINE:
        return styles.outline;
      case BUTTON_TYPES.GREY:
        return styles.grey;
      case BUTTON_TYPES.WARNING:
        return styles.warning;
      case BUTTON_TYPES.YELLOW:
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
      case SIZES.BIG:
        return styles.big;
      case SIZES.MEDIUM:
        return styles.medium;
      case SIZES.SMALL:
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

Button.propTypes = {
  /** The classname to appended to the outermost element */
  className: PropTypes.string,
  /* The type of the button (primary, secondary, grey etc.) */
  type: PropTypes.oneOf(BUTTON_TYPES.ALL),
  /* The size of the button (small/medium/big) */
  size: PropTypes.oneOf(SIZES.ALL),
  /* Whether the button is disabled */
  disabled: PropTypes.bool,
  /* OnClick callback */
  onClick: PropTypes.func,
  /* The ref passed down to the outermost DOM element */
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })]),
  /* Children to render inside the button */
  children: PropTypes.element.isRequired,
};

Button.defaultProps = {
  className: '',
  type: BUTTON_TYPES.DEFAULT,
  size: SIZES.MEDIUM,
  disabled: false,
  onClick: () => {},
};

export default Button;
