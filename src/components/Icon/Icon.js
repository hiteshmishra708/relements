import React from 'react';
import PropTypes from 'prop-types';

import styles from './Icon.scss';
import { getIcon } from './utils/getIcon';

const Icon = ({
  src = {}, className, size, onClick, innerRef,
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
  src: PropTypes.object,
  className: PropTypes.string,
  size: PropTypes.number,
  onClick: PropTypes.func,
  innerRef: PropTypes.func,
};

export default Icon;
