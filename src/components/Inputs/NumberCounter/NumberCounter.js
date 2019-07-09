import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/UI/Icon';
import Odometer from 'components/UI/Odometer';
import styles from './NumberCounter.scss';

class NumberCounter extends React.Component {
  state = {
    active: false,
    focused: false,
  };

  render() {
    const {
      className, value = '', label, error, errorMessage, errorMsgClassName, max = 100000,
    } = this.props;

    const errorClassName = error ? styles.numberCounterError : '';
    const focusedClassName = this.state.focused ? styles.focused : '';
    const minusDisabledClassName = value === 0 ? styles.disabled : '';
    const plusDisabledClassName = value >= max ? styles.disabled : '';
    const isZeroClassName = value === 0 ? styles.isZero : '';

    return (
      <div className={`${styles.numberCounter} ${errorClassName} ${className}`}>
        <span className={`${styles.numberCounterLabel} ${focusedClassName}`}>{label}</span>
        <div className={`${styles.counter} ${isZeroClassName}`}>
          <Icon
            onClick={this._handleChange(-1)}
            src="minus"
            className={`${styles.counterButton} ${minusDisabledClassName}`}
          />
          <Odometer>{value.toString()}</Odometer>
          <Icon
            onClick={this._handleChange(1)}
            src="plus2"
            className={`${styles.counterButton} ${plusDisabledClassName}`}
          />
        </div>
        {error && errorMessage && (
          <div className={`${styles.numberCounterInputSubtext} ${errorMsgClassName}`}>
            {this._renderError(errorMessage)}
          </div>
        )}
      </div>
    );
  }

  _renderError = (errorMessage) => {
    return <span className={styles.numberCounterInputSubtextError}>{errorMessage}</span>;
  };

  _handleChange = change => () => {
    const max = this.props.max || 100000;
    const value = this.props.value + change;

    if (value < 0) return;
    if (value > max) return;

    this.props.onChange(value);
  };
}

NumberCounter.propTypes = {
  className: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  label: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorMsgClassName: PropTypes.string,
  max: PropTypes.number,
};

export default NumberCounter;
