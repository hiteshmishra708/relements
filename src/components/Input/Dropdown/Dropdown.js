import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import DropdownOptions from './components/DropdownOptions';
import DropdownOption from './components/DropdownOption';

import { TextInput } from '../_common/TextInput';
import { Label } from '../_common/Label';

import { useKeyboardSelect } from './hooks/useKeyboardSelect';
import { useSearch } from './hooks/useSearch';
import { useDropdown } from './hooks/useDropdown';

import styles from './Dropdown.scss';
import { ChipsInput } from '../_common/ChipsInput';

const Dropdown = ({
  className,
  prefixClassName,
  label,
  noOptionsText,
  error,
  optionKey = 'text',
  value = [],
  options,
  onChange,
  placeholder,

  withSearch = false,
  withCreate = false,
  withMultiple = false,
}) => {
  const valueArray = Array.isArray(value) ? value : [value];
  const _TextInputDOM = useRef();
  const _TextInputWrapperDOM = useRef();
  const [searchTerm, searchResults, handleSearch] = useSearch(options, [optionKey]);
  const useDropdownProps = [searchTerm, searchResults, optionKey, valueArray, _TextInputDOM, withCreate];
  const [dropdownOptions, focused, setFocused, handleFocus, handleBlur] = useDropdown(...useDropdownProps);
  const [highlightIndex, handleKeyDown, _DropdownOptionDOMs] = useKeyboardSelect(dropdownOptions, onChange);

  const handleToggle = () => setFocused(!focused);

  const isReversed = () => _TextInputWrapperDOM.current
    && _TextInputWrapperDOM.current.getBoundingClientRect().bottom + 150 > window.innerHeight;

  const handleChange = (valueToChange) => {
    const newValue = withMultiple ? [...value, valueToChange] : valueToChange;
    onChange(newValue);
  };

  const getInputValue = () => {
    if (withMultiple) {
      return valueArray.map(value => value[optionKey]);
    }
    return valueArray[0] ? valueArray[0][optionKey] : '';
  };

  const renderOptions = () => {
    if (!dropdownOptions.length) {
      return <span className={styles.dropdownInputZeroState}>{noOptionsText || 'No options present'}</span>;
    }

    return dropdownOptions.map((option, i) => (
      <DropdownOption
        key={i}
        innerRef={_DropdownOptionDOMs.current[i]}
        selected={i === highlightIndex}
        onClick={handleChange}
        value={option}
      >
        {option[optionKey]}
      </DropdownOption>
    ));
  };

  const reverseModeClassName = isReversed ? styles.reverse : '';
  const inputValue = getInputValue();
  const Input = withMultiple ? ChipsInput : TextInput;
  return (
    <div className={`${styles.dropdown} ${prefixClassName} ${className}`}>
      <Label focused={focused} error={error} className={`${styles.dropdownLabel} ${prefixClassName}-label`}>
        {label}
      </Label>
      <Input
        innerRef={_TextInputWrapperDOM}
        inputRef={_TextInputDOM}
        className={`${reverseModeClassName}`}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseDown={handleToggle}
        onChange={handleSearch}
        focused={focused}
        active={focused}
        value={inputValue}
        placeholder={placeholder}
        disabled={!withSearch}
        withMultiple={withMultiple}
      />
      <DropdownOptions
        onClose={handleBlur}
        attachTo={_TextInputWrapperDOM}
        active={focused}
        focused={focused}
        prefixClassName={`${prefixClassName}-options`}
      >
        {renderOptions()}
      </DropdownOptions>
    </div>
  );
};

Dropdown.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  noOptionsText: PropTypes.string,
  error: PropTypes.string,
  optionKey: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  prefixClassName: PropTypes.string,

  withSearch: PropTypes.bool,
  withCreate: PropTypes.bool,
  withMultiple: PropTypes.bool,
};

export default Dropdown;
