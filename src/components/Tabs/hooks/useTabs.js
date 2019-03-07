import React, { useState, useEffect } from 'react';

export function useTabs(value, DOMRefs, children) {
  /**
   * activeIndex tracks the index of the currently selected menu item
   * left is the x-offset of the selected menu item (where the underline starts)
   * width the is width of the selected menu item
   * @type {Object}
   */
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  /**
   * This calculates the width and the offset of a particular menu item (whose
   * index is the param). Uses getBoundingClientRect and the DOMElements to
   * determine the right values
   * @param  {[type]} newIndex [description]
   * @return {[type]}          [description]
   */
  const getIndexFromValue = (value) => {
    let index = -1;
    React.Children.forEach(children, (child, i) => {
      const childValue = child.props.value;
      if (typeof childValue === 'string' && childValue === value) {
        index = i;
      }
    });

    return index;
  };

  /**
   * Returns the index of the item in the menu that's already selected
   * (based on the URL and the path property specified in the menu item obj)
   * @param  {Array}  [items=[]] [description]
   * @return {[type]}            [description]
   */
  const calcWidthAndPosition = (newIndex) => {
    let left = 0;
    let width = 0;
    DOMRefs.map((DOMElement, i) => {
      if (i < newIndex && i >= 0) {
        left += DOMElement.current.getBoundingClientRect().width;
      } else if (i === newIndex) {
        width = DOMElement.current.getBoundingClientRect().width - 1;
      }
    });

    setLeft(left);
    setWidth(width);
    setActiveIndex(newIndex);
  };

  /**
   * On mount we check if there's already a menu item that's selected, if yes,
   * then calculate it's left position as well as the width. So that we can
   * set the underline at the right position with the right dimensions
   * @return {[type]} [description]
   */
  useEffect(() => {
    const index = getIndexFromValue(value);
    calcWidthAndPosition(index);
  }, [value]);

  const renderTabs = () => React.Children.map(children, (child, i) => {
    return React.cloneElement(child, { innerRef: DOMRefs[i], active: activeIndex === i });
  });

  return [left, width, renderTabs];
}
