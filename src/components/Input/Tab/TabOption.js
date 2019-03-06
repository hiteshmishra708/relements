import React from 'react';
import PropTypes from 'prop-types';

import styles from './TabOption.scss';

const TabOption = ({
  children, onClick, selected, innerRef,
}) => {
  return (
    <div ref={innerRef} className={`${styles.tabOption} ${selected ? styles.selected : ''}`} onClick={onClick}>
      <span className={`${styles.tabOptionText} ${selected ? styles.selected : ''}`}>{children}</span>
    </div>
  );
};

TabOption.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  innerRef: PropTypes.func,
};

export default TabOption;
