import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useInput } from '../_common/hooks/useInput';
import { Label } from '../_common/Label';
import styles from './Toggle.scss';

const Toggle = ({
  label, prefixClassName, className, value, onChange, redGreen, onFocus, onBlur, error, disabled,
}) => {
  const activeClassName = value ? styles.active : '';
  const disabledClassName = disabled ? styles.disabled : '';
  const _TextInputDOM = useRef();
  const { focused, handleFocus, handleBlur } = useInput(_TextInputDOM, onFocus, onBlur);

  const redGreenClassName = redGreen ? styles.redGreen : '';
  return (
    <div
      className={`${styles.toggle} ${redGreenClassName} ${prefixClassName} ${className}`}
      onClick={() => onChange(!value)}
    >
      <Label focused={focused} error={error} className={`${styles.dropdownLabel} ${prefixClassName}-label`}>
        {label}
      </Label>
      <div
        tabIndex="0"
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`${
          styles.toggleInput
        } ${redGreenClassName}  ${prefixClassName}-toggle ${activeClassName} ${disabledClassName}`}
      >
        <div
          className={`${styles.toggleInputKnob} ${redGreenClassName} ${prefixClassName}-toggle-knob ${activeClassName}`}
        />
      </div>
    </div>
  );
};

Toggle.propTypes = {
  label: PropTypes.string,
  prefixClassName: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.bool,
  redGreen: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
};

Toggle.defaultProps = {
  label: '',
  prefixClassName: '',
  className: '',
  value: false,
  redGreen: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  error: false,
  disabled: false,
};

export default Toggle;
