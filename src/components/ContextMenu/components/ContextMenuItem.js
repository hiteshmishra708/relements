import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import styles from './ContextMenuItem.scss';

const ContextMenuItem = ({
  title, icon, iconType, iconSize, onClick, disabled, children, size, href,
}) => {
  const bigClassName = size === 'big' ? styles.big : '';
  const Tag = href ? 'a' : 'div';
  return (
    <Tag
      href={href}
      target="_blank"
      onClick={onClick}
      className={`${styles.contextMenuItem} ${disabled ? styles.disabled : ''}`}
    >
      <Icon size={iconSize} className={styles.contextMenuItemIcon} src={iconType || icon} />
      <span className={`${styles.contextMenuItemText} ${bigClassName}`}>{title || children}</span>
    </Tag>
  );
};

ContextMenuItem.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  iconSize: PropTypes.number,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default ContextMenuItem;
