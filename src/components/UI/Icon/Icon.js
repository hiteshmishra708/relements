import React from 'react';
import PropTypes from 'prop-types';

import styles from './Icon.scss';
import { getIcon } from './utils/getIcon';

/**
 * Icon component that renders an icon. It takes a string identifier
 * and renders the icon corresponding to that.
 */
const Icon = ({
  src = {}, className = '', size, onClick, innerRef,
}) => {
  if (!src) return null;
  const IconSvg = typeof src === 'string' ? getIcon(src) : src;
  return (
    <div ref={innerRef} onClick={onClick} className={`${styles.icon} ${className}`}>
      <IconSvg />
    </div>
  );
};

Icon.propTypes = {
  /** Can either be a string identifier for the icon (angle-down) or an react node */
  src: PropTypes.oneOf(PropTypes.object, PropTypes.string),
  /** The classname to be attached to the icons outer most div */
  className: PropTypes.string,
  /** The size of the icon (small/medium/large/px number)  */
  size: PropTypes.number,
  /** The callback function that will be called on click of the icon */
  onClick: PropTypes.func,
  /** Passes the ref to the outermost div  */
  innerRef: PropTypes.func,
};

export default Icon;
