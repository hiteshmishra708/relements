import React from 'react';
import PropTypes from 'prop-types';

import Accordion from '@src/components/UI/Accordion';
import './AddList.scss';

function AddList({
  value, onChange, children, defaultValue,
}) {
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const editItem = React.useCallback(index => key => (valueItem) => {
    const newValue = value.map((_, i) => (i === index ? { ...value[index], [key]: valueItem } : _),);
    onChange(newValue);
  });

  const addItem = React.useCallback(() => {
    const newValue = [...value, { ...defaultValue }];
    onChange(newValue);
  });

  const deleteItem = React.useCallback(index => (e) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  });

  const toggleItem = React.useCallback((index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  });

  return (
    <div>
      <Accordion>
        {value.map((valueItem, i) => (
          <Accordion.Item
            key={i}
            index={i}
            active={activeIndex === i}
            onChange={toggleItem}
            renderHeader={() => 'Quick Reply'}
          >
            {children(valueItem, editItem(i), deleteItem(i))}
          </Accordion.Item>
        ))}
      </Accordion>
      <button onClick={addItem}>Add</button>
    </div>
  );
}

AddList.propTypes = {
  children: PropTypes.node.isRequired,
};

AddList.defaultProps = {};

export default AddList;
