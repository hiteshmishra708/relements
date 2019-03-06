/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';

import Digit from './Digit';
import styles from './Odometer.scss';

export default class Odometer extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    innerRef: PropTypes.func,
    children: PropTypes.node,
    fontSize: PropTypes.number,
  };

  static defaultProps = {
    fontSize: 16,
  };

  render() {
    let string = this.props.children;
    string = typeof string === 'number' ? string.toString() : string;
    string = Array.isArray(string) ? string.join('') : string;

    return (
      <span
        style={{ fontSize: this.props.fontSize, height: `${this.props.fontSize}px` }}
        ref={this.props.innerRef}
        onClick={this.props.onClick}
        className={`${styles.odometer} ${this.props.className}`}
      >
        {string.split('').map((letter, i) => {
          if (!Number.isNaN(parseInt(letter, 10))) {
            return (
              <Digit fontSize={this.props.fontSize} value={string} key={i}>
                {parseInt(letter, 10)}
              </Digit>
            );
          }
          return <span style={{lineHeight: `${this.props.fontSize}px`}}>{letter}</span>;
        })}
      </span>
    );
  }
}
