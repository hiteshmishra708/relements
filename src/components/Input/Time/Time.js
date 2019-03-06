import React from 'react';
import PropTypes from 'prop-types';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';
import 'flatpickr/dist/themes/airbnb.css';

import Icon from 'components/Icon';
import AngleDownIcon from 'icons/angle-down.svg';
import styles from './Time.scss';

class Time extends React.Component {
  state = {
    active: false,
    focused: false,
  };

  componentDidMount() {
    this._flatpickr = flatpickr(this._FlatPickrDOM, {
      onChange: this._handleChange,
      onClose: this._handleBlur,
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      defaultDate: this.props.value,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this._flatpickr.setDate(nextProps.value);
    }
  }

  render() {
    const {
      placeholder, className, value = '', label, error, errorMessage, errorMsgClassName,
    } = this.props;

    const activeClassName = this.state.active ? styles.active : '';
    const errorClassName = error ? styles.timeError : '';
    const focusedClassName = this.state.focused ? styles.focused : '';
    const parsedValue = value ? dayjs(value).format('h:mm A') : '';

    return (
      <div className={`${styles.time} ${errorClassName} ${className}`}>
        <span className={`${styles.timeLabel} ${focusedClassName}`}>{label}</span>
        <div
          ref={(DOMNode) => {
            this._DOMNode = DOMNode;
          }}
          tabIndex="0"
          onKeyDown={this._handleKeyDown}
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
          onClick={this._toggleTime}
          className={`${styles.timeInputWrapper} ${activeClassName} ${focusedClassName}`}
        >
          <div className={styles.timeInput}>{parsedValue || <span>{placeholder}</span>}</div>
          <Icon src={{ default: AngleDownIcon }} />
          <div
            className={styles.timePickrInput}
            ref={(DOMNode) => {
              this._FlatPickrDOM = DOMNode;
            }}
          />
        </div>
        {error && errorMessage && (
          <div className={`${styles.timeInputSubtext} ${errorMsgClassName}`}>{this._renderError(errorMessage)}</div>
        )}
      </div>
    );
  }

  _renderError = (errorMessage) => {
    return <span className={styles.timeInputSubtextError}>{errorMessage}</span>;
  };

  _handleFocus = (e) => {
    this.props.onFocus && this.props.onFocus(e);
    this._flatpickr.open();
    // this._DOMNode.scrollIntoView();
    this._timeout = setTimeout(() => {
      this.setState({ active: true, focused: true });
    }, 300);
  };

  _handleBlur = (e) => {
    if (this._flatpickr.isOpen) return;

    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this.setState({ active: false, focused: false });
    this.props.onBlur && this.props.onBlur(e);
  };

  _onTimeClick = (option) => {
    this.setState({ active: false, focused: false });
    this.props.onChange(option);
  };

  _handleChange = (e) => {
    this._onTimeClick(e[0]);
  };

  _toggleTime = () => {
    this.setState({ active: !this.state.active, focused: !this.state.active }, () => {
      this.state.active ? this._flatpickr.open() : this._flatpickr.close();
    });
  };
}

Time.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  label: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorMsgClassName: PropTypes.string,
};

export default Time;
