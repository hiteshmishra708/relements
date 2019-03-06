import React from 'react';
import PropTypes from 'prop-types';
import AutosizeInput from 'react-input-autosize';

import { KEY_CODES } from 'constants';
import CrossIcon from 'icons/close.svg';
import Icon from 'components/Icon';

import styles from './Chips.scss';

export default class Chips extends React.Component {
  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    uniqueOnly: PropTypes.bool,
    style: PropTypes.object,
    disabled: PropTypes.bool,

    className: PropTypes.string,
    label: PropTypes.string,
    labelClassName: PropTypes.string,
    hint: PropTypes.string,
    hintClassName: PropTypes.string,
  };

  constructor() {
    super();

    this.state = {
      newChipValue: '',
    };

    this.renderChip = this.renderChip.bind(this);
  }

  render() {
    const disabledClassName = this.props.disabled ? styles.disabled : '';

    const {
      className, label, labelClassName, hint, hintClassName,
    } = this.props;

    return (
      <div
        className={`${styles.container} ${disabledClassName} ${className}`}
        onClick={this._focusInput}
        style={this.props.style}
      >
        {label ? (
          <div className={`${styles.label}`}>
            <span className={`${styles.labelText} ${labelClassName}`}>{label}</span>
          </div>
        ) : null}
        {hint ? <span className={`${styles.hint} ${hintClassName}`}>{hint}</span> : null}
        <div className={`${styles.chips} ${className}-input`}>
          <div className={styles.chipsTrack}>
            {!this.props.disabled ? this.renderInput() : null}
            {this.props.value.map(this.renderChip)}
          </div>
        </div>
      </div>
    );
  }

  renderChip(title, i) {
    return (
      <div key={i} className={styles.chip}>
        {title}
        {!this.props.disabled && (
          <Icon
            onClick={e => this._deleteChip(e, title)}
            src={{ default: CrossIcon }}
            className={styles.deleteChipIcon}
          />
        )}
      </div>
    );
  }

  renderInput() {
    return (
      <AutosizeInput
        ref={(inputRef) => {
          if (inputRef) this._inputRef = inputRef;
        }}
        inputClassName={styles.newChip}
        onKeyDown={this._handleKeyDown}
        onChange={this._handleChange}
        value={this.state.newChipValue}
        placeholder={this.props.placeholder || 'Enter here...'}
      />
    );
  }

  _deleteChip = (e, value) => {
    if (this.props.disabled) return;

    const valueList = this.props.value;
    valueList.splice(valueList.indexOf(value), 1);
    this.props.onChange(valueList);
  };

  _handleChange = (e) => {
    this.setState({
      newChipValue: e.target.value,
    });
  };

  _handleKeyDown = (e) => {
    if (this.props.disabled) return;

    switch (e.keyCode) {
      case KEY_CODES.ENTER:
        if (!this.props.uniqueOnly || !this.props.value.includes(e.target.value)) {
          const valueList = this.props.value.concat([e.target.value]);
          this.props.onChange(valueList);
        }
        this.setState({
          newChipValue: '',
        });
        break;

      case KEY_CODES.ESC:
        this.setState({
          newChipValue: '',
        });
        break;

      case KEY_CODES.BACKSPACE:
        if (this.state.newChipValue.length === 0) {
          const currentValueList = this.props.value;
          const valueList = currentValueList.slice(0, currentValueList.length - 1);
          this.props.onChange(valueList);
        }
        break;

      default:
        break;
    }
  };

  _focusInput = () => {
    if (this.props.disabled) return;
    if (this._inputRef) this._inputRef.focus();
  };
}
