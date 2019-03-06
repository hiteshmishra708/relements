import React from 'react';
import PropTypes from 'prop-types';

import styles from './Toggle.scss';

const Toggle = ({
  label, className, value, onChange, redGreen,
}) => {
  const activeClassName = value ? styles.active : '';
  const redGreenClassName = redGreen ? styles.redGreen : '';
  return (
    <div className={`${styles.toggle} ${redGreenClassName} ${className}`} onClick={() => onChange(!value)}>
      <div className={styles.toggleLabel}>{label}</div>
      <div className={`${styles.toggleInput} ${redGreenClassName} ${activeClassName}`}>
        <div className={`${styles.toggleInputKnob} ${redGreenClassName} ${activeClassName}`} />
      </div>
    </div>
  );
};

Toggle.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Toggle;
