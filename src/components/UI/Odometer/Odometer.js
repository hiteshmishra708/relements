/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';

import Digit from './components/Digit';
import styles from './Odometer.scss';

const Odometer = ({
  children, fontSize, onClick, innerRef, className,
}) => {
  let string = children;
  string = typeof string === 'number' ? string.toString() : string;
  string = Array.isArray(string) ? string.join('') : string;

  return (
    <span
      style={{ fontSize, height: `${fontSize}px` }}
      ref={innerRef}
      onClick={onClick}
      className={`${styles.odometer} ${className}`}
    >
      {string.split('').map((letter, i) => {
        if (!Number.isNaN(parseInt(letter, 10))) {
          return (
            <Digit fontSize={fontSize} value={string} key={i}>
              {parseInt(letter, 10)}
            </Digit>
          );
        }
        return <span style={{ lineHeight: `${fontSize}px` }}>{letter}</span>;
      })}
    </span>
  );
};

Odometer.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  innerRef: PropTypes.func,
  children: PropTypes.node,
  fontSize: PropTypes.number,
};

Odometer.defaultProps = {
  fontSize: 16,
};

export default Odometer;
