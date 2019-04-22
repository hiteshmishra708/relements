import { useState, useRef, useEffect } from 'react';

export function useDropdown(createTerm, options, optionKey, value, inputDOM, allowCreate, createPrefix = '+ Create') {
  let _timeout;
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    e.preventDefault();
    setFocused(true);
    inputDOM.current && inputDOM.current.focus();
  };

  const handleBlur = () => {
    if (_timeout) clearTimeout(_timeout);
    setFocused(false);
    inputDOM.current && inputDOM.current.blur();
  };

  const getFilteredOptions = () => {
    const flatValue = value.map(valueItem => valueItem[optionKey]);
    let filteredOptions = options.filter(option => !flatValue.includes(option[optionKey]));
    if (allowCreate && createTerm) {
      filteredOptions = [
        {
          [optionKey]: `${createPrefix} "${createTerm}"`,
          type: 'CREATE',
        },
      ].concat(filteredOptions);
    }
    return filteredOptions;
  };

  return [getFilteredOptions(options), focused, setFocused, handleFocus, handleBlur];
}
