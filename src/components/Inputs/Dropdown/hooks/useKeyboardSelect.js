import {
  useState, createRef, useEffect, useRef,
} from 'react';
import { KEY_CODES } from 'constants';

export function useKeyboardSelect(options, onSelect) {
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const dropdownDOMs = useRef();
  const changeHighlightIndex = (newIndex) => {
    if (newIndex >= options.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = options.length - 1;
    }
    dropdownDOMs.current[newIndex].current.scrollIntoView(false);
    setHighlightIndex(newIndex);
  };

  const handleKeyDown = (e) => {
    switch (e.keyCode) {
      case KEY_CODES.DOWN:
        e.preventDefault();
        return changeHighlightIndex(highlightIndex + 1);
      case KEY_CODES.UP:
        e.preventDefault();
        return changeHighlightIndex(highlightIndex - 1);
      case KEY_CODES.ENTER:
        e.preventDefault();
        return onSelect(options[highlightIndex]);
      default:
        return null;
    }
  };

  useEffect(() => {
    dropdownDOMs.current = new Array(options.length).fill(0).map(() => createRef());
  }, [options.length]);

  return [highlightIndex, handleKeyDown, dropdownDOMs];
}