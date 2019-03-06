/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './Digit.scss';

export default class Digit extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fontSize: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.children || 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value > nextProps.value) {
      this.componentWillDecrement(nextProps);
    } else {
      this.componentWillIncrement(nextProps);
    }
  }

  componentWillDecrement(nextProps) {
    if (this.props.children < nextProps.children) {
      this.setState({ value: nextProps.children - 10, animating: true }, () => {
        setTimeout(() => this.setState({ value: nextProps.children, animating: false }), 250);
      });
    } else if (this.props.children !== nextProps.children) {
      this.setState({ value: nextProps.children, animating: true });
    }
  }

  componentWillIncrement(nextProps) {
    if (this.props.children > nextProps.children) {
      this.setState({ value: nextProps.children + 10, animating: true }, () => {
        setTimeout(() => this.setState({ value: nextProps.children, animating: false }), 250);
      });
    } else if (this.props.children !== nextProps.children) {
      this.setState({ value: nextProps.children, animating: true });
    }
  }

  render() {
    const top = (this.state.value + 10) * this.props.fontSize;
    const animatingClassName = this.state.animating ? styles.animating : '';
    return (
      <span
        style={{ transform: `translateY(-${top}px)`, lineHeight: `${this.props.fontSize}px` }}
        className={`${styles.digit} ${animatingClassName}`}
      >
        {new Array(30).fill(0).map((_, i) => {
          const activeClassName = i % 10 === this.props.children ? styles.active : '';
          return (
            <span key={i} className={`${styles.digitNumber} ${activeClassName}`}>
              {i % 10}
            </span>
          );
        })}
      </span>
    );
  }
}
