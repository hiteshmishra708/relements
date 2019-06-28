import React from 'react';
import PropTypes from 'prop-types';

import RadioOption from './components/RadioOption';
import styles from './Radio.scss';
import { Label } from '../_common/Label';
import { useRadio } from './hooks/useRadio';

const Radio = ({
  value, onChange, options, label, hint, className, prefixClassName, error, optionKey,
}) => {
  const [activeIndex, handleChange] = useRadio(value, onChange, options, optionKey);
  return (
    <div className={`${styles.radio} ${className}`}>
      <Label error={error} className={`${prefixClassName}-label`}>
        {label}
      </Label>
      <div className={styles.radioOptions}>
        {options.map((option, i) => {
          return <RadioOption value={activeIndex === i} onChange={handleChange(i)} label={option.title} />;
        })}
      </div>
    </div>
  );
};

Radio.propTypes = {
  className: PropTypes.string,
  hint: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  prefixClassName: PropTypes.string,
  options: PropTypes.array,
  optionKey: PropTypes.string,
};

Radio.Item = RadioOption;

export default Radio;
