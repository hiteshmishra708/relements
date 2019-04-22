import React from 'react';
import PropTypes from 'prop-types';

import CheckboxOption from './components/CheckboxOption';
import styles from './Checkbox.scss';
import { Label } from '../_common/Label';
import { useCheckbox } from './hooks/useCheckbox';

const Checkbox = ({
  value, onChange, options, label, hint, className, prefixClassName, error,
}) => {
  const [activeIndexes, handleChange] = useCheckbox(value, onChange, options);
  return (
    <div className={`${styles.checkbox} ${className}`}>
      <Label error={error} className={`${styles.dropdownLabel} ${prefixClassName}-label`}>
        {label}
      </Label>
      <div className={styles.checkboxOptions}>
        {options.map((option, i) => {
          return <CheckboxOption value={activeIndexes.includes(i)} onChange={handleChange(i)} label={option.title} />;
        })}
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  hint: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  prefixClassName: PropTypes.string,
  options: PropTypes.array,
};

Checkbox.Item = CheckboxOption;

export default Checkbox;
