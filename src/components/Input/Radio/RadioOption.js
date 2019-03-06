import React from 'react';
import PropTypes from 'prop-types';

import styles from './RadioOption.scss';

const RadioOption = ({
  children, onClick, selected, innerRef, hint, optionClassname,
}) => {
  return (
    <div className={optionClassname}>
      <div
        ref={innerRef}
        className={`${styles.radioOption} ${selected ? styles.radioOptionSelected : ''}`}
        onClick={onClick}
      >
        <div className={`${styles.radioOptionBox} ${selected ? styles.radioOptionBoxSelected : ''}`}>
          <div className={`${styles.radioOptionBoxTick} ${selected ? styles.radioOptionBoxTickSelected : ''}`} />
        </div>
        <span className={`${styles.radioOptionText} ${selected ? styles.radioOptionSelected : ''}`}>{children}</span>
      </div>
      { hint
        ? <div className={styles.hint}>
            <span>{hint}</span>
          </div>
        : null 
      }
    </div>
  );
};

RadioOption.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  innerRef: PropTypes.func,
  hint: PropTypes.string,
  optionClassname: PropTypes.string,
};

export default RadioOption;
