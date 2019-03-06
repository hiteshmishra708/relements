import React from 'react';
import PropTypes from 'prop-types';
import styles from './ComponentDrawerBody.scss';

const ComponentDrawerBody = ({ children, className }) => (
  <div className={`${styles.drawerBody} ${className}`}>{children}</div>
);

ComponentDrawerBody.propTypes = {
  children: PropTypes.node,
};

export default ComponentDrawerBody;
