import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';

import AccordionItem from './components/AccordionItem';
import styles from './Accordion.scss';

const Accordion = ({ children, className = '' }) => (
  <div data-testid="accordion" className={`${styles.accordionWrapper} ${className}`}>
    {children}
  </div>
);

Accordion.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Accordion.Sortable = SortableContainer(Accordion);
Accordion.Item = AccordionItem;

export default Accordion;
