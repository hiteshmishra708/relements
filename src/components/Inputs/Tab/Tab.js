import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useTabs } from '../_common/hooks/useTabs';
import { useInput } from '../_common/hooks/useInput';
import { Label } from '../_common/Label';
import TabOption from './components/TabOption';
import styles from './Tab.scss';

function Tab({
  className,
  prefixClassName,
  error,
  label,
  options = [],
  disabled,
  value,
  onChange,
  onFocus,
  onBlur,
  optionKey,
}) {
  const {
    handleChange, handleRef, width, offset, activeIndex, displayOptions,
  } = useTabs(
    value,
    onChange,
    options,
    optionKey
  );
  const _TextInputDOM = useRef();
  const { focused, handleFocus, handleBlur } = useInput(_TextInputDOM, onFocus, onBlur);
  const disabledClassName = disabled ? styles.disabled : '';

  return (
    <div tabIndex="0" onFocus={handleFocus} onBlur={handleBlur} className={`${styles.tab} ${className}`}>
      <Label focused={focused} error={error} className={`${styles.dropdownLabel} ${prefixClassName}-label`}>
        {label}
      </Label>
      <div className={`${styles.tabOptionsWrapper} ${disabledClassName}`}>
        <div className={styles.tabOptions}>
          {displayOptions.map((displayOption, i) => {
            return (
              <TabOption innerRef={handleRef(i)} onClick={handleChange(i)} selected={activeIndex === i}>
                {displayOption}
              </TabOption>
            );
          })}
        </div>
        <div className={styles.tabOptionsBG} style={{ width, left: offset }} />
      </div>
    </div>
  );
}

Tab.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  optionKey: PropTypes.string,
  options: PropTypes.array,
  prefixClassName: PropTypes.string,
  value: PropTypes.string,
};

Tab.defaultProps = {
  className: '',
  disabled: false,
  error: '',
  label: '',
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  optionKey: '',
  options: [],
  prefixClassName: '',
  value: '',
};

export default Tab;
