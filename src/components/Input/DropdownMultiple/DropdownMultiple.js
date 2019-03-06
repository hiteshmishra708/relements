import React from 'react';
import PropTypes from 'prop-types';

import { KEY_CODES } from 'constants';
import Icon from 'components/Icon';
import AngleDownIcon from 'icons/angle-down.svg';
import CrossIcon from 'icons/close.svg';
import DropdownOptions from '../Dropdown/DropdownOptions';
import DropdownOption from '../Dropdown/DropdownOption';
import styles from './DropdownMultiple.scss';

class DropdownMultiple extends React.Component {
  state = {
    active: false,
    focused: false,
    activeIndex: 0,
  };

  _dropdownOptionsDOMs = [];

  render() {
    const {
      placeholder,
      className,
      value = [],
      label,
      options = [],
      optionKey = 'text',
      noOptionsText,
      error,
    } = this.props;

    const flatValue = value.map(valueItem => valueItem[optionKey]);
    const filteredOptions = options.filter(option => !flatValue.includes(option[optionKey]));

    const activeClassName = this.state.active ? styles.active : '';
    const focusedClassName = this.state.focused ? styles.focused : '';
    const errorClassName = error ? styles.error : '';

    let reverseModeClassName = '';
    if (this._DOMNode && this._DOMNode.getBoundingClientRect().bottom + 150 > window.innerHeight) {
      reverseModeClassName = styles.reverse;
    }

    return (
      <div className={`${styles.dropdown} ${className}`}>
        <span className={`${styles.dropdownLabel} ${focusedClassName} ${errorClassName}`}>{label}</span>
        <div
          ref={(DOMNode) => {
            this._DOMNode = DOMNode;
          }}
          tabIndex={this.props.tabIndex || '0'}
          onKeyDown={this._handleKeyDown}
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
          onMouseDown={this._toggleDropdown}
          className={`${
            styles.dropdownInputWrapper
          } ${activeClassName} ${focusedClassName} ${errorClassName} ${reverseModeClassName}`}
        >
          <div className={styles.dropdownInput}>
            {value.length > 0 ? this._renderValues() : <span>{placeholder}</span>}
          </div>
          <Icon src={{ default: AngleDownIcon }} />
          {/* {error ? <div className={styles.dropdownInputSubtext}>{this._renderError(error)} </div>: null} */}
        </div>
        <DropdownOptions
          onClose={this._handleBlur}
          attachTo={this._DOMNode}
          active={this.state.active}
          focused={this.state.focused}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, i) => (
              <DropdownOption
                innerRef={(DOMNode) => {
                  this._dropdownOptionsDOMs[i] = DOMNode;
                }}
                selected={i === this.state.activeIndex}
                key={i}
                onClick={() => this._onDropdownClick(option)}
              >
                {option[optionKey]}
              </DropdownOption>
            ))
          ) : (
            <span className={styles.dropdownInputZeroState}> {noOptionsText || 'No options present'} </span>
          )}
        </DropdownOptions>
      </div>
    );
  }

  _renderValues = () => {
    return (
      <div className={styles.dropdownInputValue}>
        {this.props.value.map((valueItem, i) => (
          <div onMouseDown={e => this._deleteChip(e, valueItem, i)} className={styles.dropdownInputValueChip}>
            {valueItem[this.props.optionKey || 'text']}
            <Icon src={{ default: CrossIcon }} className={styles.dropdownInputValueChipIcon} />
          </div>
        ))}
      </div>
    );
  };

  _renderError = (error) => {
    error = error || 'Copy too long';
    return <span className={styles.dropdownInputSubtextError}>{error}</span>;
  };

  _addChip = (valueItem) => {
    const value = this.props.value.concat([valueItem]);
    this.props.onChange(value);
  };

  _deleteChip = (e, valueItem, indexToDelete) => {
    e.preventDefault();
    e.stopPropagation();
    const value = this.props.value.filter((valueItem, i) => i !== indexToDelete);
    this.props.onChange(value);
  };

  _handleKeyDown = (e) => {
    const activeIndex = this.state.activeIndex;

    switch (e.keyCode) {
      case KEY_CODES.DOWN:
        e.preventDefault();
        return this._changeActiveIndex(activeIndex + 1);
      case KEY_CODES.UP:
        e.preventDefault();
        return this._changeActiveIndex(activeIndex - 1);
      case KEY_CODES.ENTER:
        e.preventDefault();
        return this._onDropdownClick(this.props.options[activeIndex]);
      default:
        return null;
    }
  };

  _changeActiveIndex = (newIndex) => {
    if (newIndex >= this.props.options.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = this.props.options.length - 1;
    }

    this._dropdownOptionsDOMs[newIndex].scrollIntoView(false);
    this.setState({ activeIndex: newIndex });
  };

  _handleFocus = (e) => {
    e.preventDefault();
    this.props.onFocus && this.props.onFocus(e);
    // this._DOMNode.scrollIntoView();
    this._timeout = setTimeout(() => {
      this.setState({ active: true, focused: true });
    }, 300);
  };

  _handleBlur = (e) => {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this.setState({ active: false, focused: false });
    this.props.onBlur && this.props.onBlur(e);
  };

  _onDropdownClick = (option) => {
    this.setState({ active: false });
    this._addChip(option);
  };

  _toggleDropdown = () => {
    this.setState({ active: !this.state.active });
  };
}

DropdownMultiple.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  options: PropTypes.array,
  tabIndex: PropTypes.string,
};

export default DropdownMultiple;
