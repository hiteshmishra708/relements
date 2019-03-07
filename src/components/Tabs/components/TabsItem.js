import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';

import styles from './TabsItem.scss';

/**
 * Custom renderer to render the individual menu items
 * Using the ref attribute, we get the DOMElement wrapper associated with this
 * menu item. We push the DOMElement into the this._menuItems array at it's
 * index
 * @param  {[type]} item [description]
 * @param  {[type]} i    [description]
 * @return {[type]}      [description]
 */
export const TabsItem = ({
  children, active, disabled, icon, prefixClassName, onClick, innerRef, value,
}) => {
  const component = typeof children !== 'string' && typeof children !== 'number' ? children : null;
  const title = component ? null : children;
  const activeClassName = active ? styles.active : '';
  const activeStringClassName = active ? 'active' : '';
  const activeIconClassName = active ? 'active' : '';
  const disabledClassName = disabled ? styles.disabled : '';
  const bigClassName = 'big' ? styles.big : '';

  return (
    <div
      onClick={() => onClick(value)}
      ref={innerRef}
      className={`${
        styles.TabsItem
      } ${prefixClassName}-item ${activeClassName} ${activeStringClassName} ${disabledClassName} ${bigClassName}`}
    >
      {component ? (
        React.cloneElement(component, { active })
      ) : (
        <React.Fragment>
          <Icon
            src={icon}
            className={`${styles.TabsItemIcon} ${bigClassName} ${prefixClassName}-item-icon ${activeIconClassName}`}
          />
          <span className={`${styles.TabsItemText} ${activeClassName} ${bigClassName} ${prefixClassName}-item-text`}>
            {title}
          </span>
        </React.Fragment>
      )}
    </div>
  );
};

TabsItem.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
  prefixClassName: PropTypes.string,
  onClick: PropTypes.func,
  innerRef: PropTypes.object,
  value: PropTypes.string,
};
