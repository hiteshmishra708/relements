import React from 'react';
import PropTypes from 'prop-types';

import { TabsItem } from './components/TabsItem';
import { useTabs } from './hooks/useTabs';
import styles from './Tabs.scss';

/**
 * Navigation Component
 *
 * Renders the menu based on the items prop that contains everything such as title,
 * icon, url etc.
 * @type {Object}
 */

const Tabs = ({
  className, prefixClassName, children, value = '',
}) => {
  const DOMRefs = new Array(React.Children.count(children)).fill().map(() => React.useRef());
  const [left, width, renderTabs] = useTabs(value, DOMRefs, children);
  const transform = `translateX(${left}px) scale(${width}, 1)`;

  return (
    <div className={`${styles.Tabs} ${prefixClassName} ${className}`}>
      <div className={`${styles.TabsItems} ${prefixClassName}-items`}>{renderTabs()}</div>
      <div style={{ transform }} className={`${styles.TabsIndicator} ${prefixClassName}-indicator`} />
    </div>
  );
};

Tabs.Item = TabsItem;
Tabs.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  prefixClassName: PropTypes.string,
  children: PropTypes.node,
};

export default Tabs;
