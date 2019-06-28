import React from 'react';
import PropTypes from 'prop-types';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';
import 'flatpickr/dist/themes/airbnb.css';

import ComponentTooltip from 'components/ComponentTooltip';
import Icon from 'components/UI/Icon';
import AngleDownIcon from 'icons/angle-down.svg';
import styles from './Date.scss';

class Date extends React.Component {
  state = {
    active: false,
    focused: false,
  };

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this._flatpickr.setDate(nextProps.value);
    }
  }

  render() {
    const {
      placeholder, className, value = '', label, error, errorMessage, errorMsgClassName, disabled,
    } = this.props;

    const activeClassName = this.state.active ? styles.active : '';
    const focusedClassName = this.state.focused ? styles.focused : '';
    const errorClassName = error ? styles.dateError : '';
    const disabledClassName = disabled ? styles.disabled : '';

    let parsedValue = '';
    if (this.props.mode === 'range' && value[0] && value[1]) {
      parsedValue = value ? `${dayjs(value[0]).format('DD/MM/YYYY')} - ${dayjs(value[1]).format('DD/MM/YYYY')}` : '';
    } else if (!this.props.mode || this.props.mode === 'single') {
      parsedValue = value ? dayjs(value).format('DD/MM/YYYY') : '';
    }

    const today = dayjs().format('DD/MM/YYYY');
    const tomorrow = dayjs().add(1, 'day').format('DD/MM/YYYY');

    if (parsedValue === today) parsedValue = 'Today';
    else if (parsedValue === tomorrow) parsedValue = 'Tomorrow';

    return (
      <div className={`${styles.date} ${errorClassName} ${disabledClassName} ${className}`}>
        {this.props.noInput ? null : (
          <React.Fragment>
            <span className={`${styles.dateLabel} ${focusedClassName}`}>{label}</span>
            <div
              ref={(DOMNode) => {
                this._DOMNode = DOMNode;
              }}
              tabIndex="0"
              onKeyDown={this._handleKeyDown}
              onFocus={this._handleFocus}
              onBlur={this._handleBlur}
              onClick={this.toggleDate}
              className={`${styles.dateInputWrapper} ${activeClassName} ${disabledClassName} ${focusedClassName}`}
            >
              <div className={styles.dateInput}>{parsedValue || <span>{placeholder}</span>}</div>
              <Icon src={{ default: AngleDownIcon }} />
            </div>
          </React.Fragment>
        )}
        <ComponentTooltip
          onOverlayClick={this.toggleDate}
          attachTo={this.props.attachTo || this._DOMNode}
          active={this.state.active}
          offset={this.props.offset}
          className="date-picker-tooltip"
          position={this.props.position}
        >
          <div
            className={styles.datePickrInput}
            ref={(DOMNode) => {
              this._FlatPickrDOM = DOMNode;
            }}
          />
        </ComponentTooltip>
        {error && errorMessage && (
          <div className={`${styles.dateInputSubtext} ${errorMsgClassName}`}>{this._renderError(errorMessage)}</div>
        )}
      </div>
    );
  }

  _renderError = (errorMessage) => {
    return <span className={styles.dateInputSubtextError}>{errorMessage}</span>;
  };

  _handleFocus = (e) => {
    this.props.onFocus && this.props.onFocus(e);
  };

  _handleBlur = (e) => {
    this.props.onBlur && this.props.onBlur(e);
  };

  _onDateClick = (option) => {
    this.props.onChange(option);
  };

  _handleChange = (e) => {
    if (this.props.mode === 'range' && e[0] && e[1]) {
      this._onDateClick(e);
    } else if (!this.props.mode || this.props.mode === 'single') {
      this._onDateClick(e[0]);
    }
  };

  toggleDate = () => {
    this.setState({ active: !this.state.active, focused: !this.state.active }, () => {
      if (this.state.active) {
        this._flatpickr = flatpickr(this._FlatPickrDOM, {
          mode: this.props.mode || 'single',
          minDate: this.props.minDate,
          maxDate: this.props.maxDate,
          inline: true,
          onChange: this._handleChange,
          defaultDate: this.props.value,
          onClose: () => this.setState({ active: false }),
        });
      } else {
        this._flatpickr.destroy();
      }
    });
  };
}

Date.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  noInput: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorMsgClassName: PropTypes.string,
};

export default Date;
