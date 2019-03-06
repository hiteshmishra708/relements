import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';

import styles from './Accordion.scss';

const Accordion = ({ children }) => <div className={styles.accordionWrapper}>{children}</div>;

Accordion.propTypes = {
  children: PropTypes.node,
};

export default SortableContainer(Accordion);
