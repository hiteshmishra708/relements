import React from 'react';
import PropTypes from 'prop-types';
import styles from './ComponentModalBody.scss';

const ComponentModalBody = ({ children }) => <div className={styles.modalBody}>{children}</div>;

ComponentModalBody.propTypes = {
  children: PropTypes.node,
};

export default ComponentModalBody;
