import React from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';

import { KEY_CODES } from 'constants';
import Icon from 'components/Icon';
import AngleDownIcon from 'icons/angle-down.svg';
import CrossIcon from 'icons/close.svg';
import DropdownOptions from '../Dropdown/DropdownOptions';
import DropdownOption from '../Dropdown/DropdownOption';
import styles from './DropdownSearch.scss';

class DropdownSearch extends React.Component {
  state = {
    active: false,
    focused: false,
    activeIndex: 0,
    searchTerm: '',
    searchResults: [],
  };

  fuseOptions = {
    shouldSort: true,
    threshold: 0.2,
    tokenize: true,
    matchAllTokens: true,
    findAllMatches: true,
    location: 0,
    distance: 50,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [this.props.optionKey || 'text'],
  };

  _dropdownOptionsDOMs = [];

  componentDidMount() {
    this._setupSearch();
    this._calculateActiveIndex(this.props);

    if (this.props.value && this.props.value[this.props.optionKey || 'text']) {
      this.setState({ searchTerm: this.props.value[this.props.optionKey || 'text'] });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.options && nextProps.options) {
      this._setupSearch(nextProps);
    } else if (this.props.options.length !== nextProps.options.length) {
      this._setupSearch(nextProps);
    }

    if (this.props.value !== nextProps.value) {
      this._calculateActiveIndex(nextProps);
      this.setState({ searchTerm: nextProps.value[nextProps.optionKey || 'text'] });
    }
  }

  render() {
    const {
      placeholder,
      className,
      value = '',
      label,
      options = [],
      optionKey = 'text',
      noOptionsText,
      error,
      errorMessage,
      errorMsgClassName,
      hint,
      allowClear,
    } = this.props;

    const parsedValue = typeof value === 'string' ? value : value[optionKey];

    const activeClassName = this.state.active ? styles.active : '';
    const focusedClassName = this.state.focused ? styles.focused : '';
    const errorClassName = error ? styles.error : '';
    let reverseModeClassName = '';
    if (this._DOMNode && this._DOMNode.getBoundingClientRect().bottom + 150 > window.innerHeight) {
      reverseModeClassName = styles.reverse;
    }

    const filteredOptions = this._getFilteredOptions(this.state.searchResults);

    return (
      <div className={`${styles.dropdown} ${className}`}>
        {label ? (
          <span className={`${styles.dropdownLabel} ${className}-label ${focusedClassName} ${errorClassName}`}>
            {label}
          </span>
        ) : null}
        {hint ? <span className={`${styles.textHint} ${className}-hint`}>{hint}</span> : null}
        <div
          ref={(DOMNode) => {
            this._DOMNode = DOMNode;
          }}
          tabIndex="0"
          onKeyDown={this._handleKeyDown}
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
          onClick={this._toggleDropdown}
          className={`${
            styles.dropdownInputWrapper
          } ${className}-input-wrapper ${activeClassName} ${focusedClassName} ${errorClassName} ${reverseModeClassName}`}
        >
          <div className={`${styles.dropdownInput} ${className}-input`}>
            <input
              value={this.state.searchTerm}
              onChange={this._handleSearch}
              type="text"
              placeholder={this.props.placeholder || 'Start typing to add...'}
              ref={(DOMElement) => {
                this._inputDOM = DOMElement;
              }}
            />
          </div>
          {this.state.searchTerm && allowClear ? (
            <Icon
              onMouseDown={this._clearValue}
              className={`${styles.dropdownInputClear} ${className}-input-clear`}
              tooltip="Clear Value"
              tooltipPosition="TOP"
              src={{ default: () => <span onClick={this._clearValue}>╳</span> }}
            />
          ) : null}
          <Icon src={{ default: AngleDownIcon }} />
        </div>
        {error && errorMessage && (
          <div className={`${styles.dropdownInputSubtext} ${errorMsgClassName}`}>{this._renderError(errorMessage)}</div>
        )}
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
                created={option.type === 'CREATE'}
              >
                {option[optionKey]}
              </DropdownOption>
            ))
          ) : (
            <span className={styles.dropdownInputZeroState}>{noOptionsText || 'No options present'}</span>
          )}
        </DropdownOptions>
      </div>
    );
  }

  _renderError = (error) => {
    error = error || 'Copy too long';
    return <span className={styles.dropdownInputSubtextError}>{error}</span>;
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
        if (!this._getFilteredOptions(this.state.searchResults)[activeIndex]) return;
        return this._onDropdownClick(this._getFilteredOptions(this.state.searchResults)[activeIndex]);
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

    if (this._dropdownOptionsDOMs[newIndex]) this._dropdownOptionsDOMs[newIndex].scrollIntoView(false);
    this.setState({ activeIndex: newIndex });
  };

  _calculateActiveIndex = (props) => {
    const { options, optionKey = 'text', value } = props;
    options.map((option, i) => {
      if (value && option[optionKey] === value[optionKey]) {
        this.setState({ activeIndex: i });
      }
    });
  };

  _handleFocus = (e) => {
    this._inputDOM.focus();
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
    this._inputDOM.blur();
  };

  _onDropdownClick = (option) => {
    this.setState({ active: false });
    this.props.onChange(option);
  };

  _clearValue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this._onDropdownClick({ [this.props.optionKey || 'text']: '' });
  };

  _toggleDropdown = () => {
    this.setState({ active: !this.state.active });
  };

  _setupSearch = (props = this.props) => {
    const options = props.options;
    this.fuseOptions.keys = props.searchKeys ? props.searchKeys : this.fuseOptions.keys;
    this._fuse = new Fuse(options, this.fuseOptions);
    this.setState({ searchResults: options });
  };

  _handleSearch = (e) => {
    const searchTerm = e.target.value;

    if (searchTerm.length === 0 && this.props.onChange) {
      this.setState({ searchResults: this.props.options });
    } else if (this.props.onChange) {
      this.setState({ searchResults: this._fuse.search(searchTerm) });
    }

    this.setState({ searchTerm });
  };

  _getFilteredOptions = (options) => {
    const { value = {}, optionKey = 'text', allowCreate } = this.props;

    let filteredOptions = options.filter(option => !value[optionKey] || !value[optionKey].includes(option[optionKey]));
    let isPresent = false;
    options.map((option) => {
      if (option[optionKey].toLowerCase() === this.state.searchTerm.toLowerCase()) isPresent = true;
    });

    if (!isPresent && allowCreate && this.state.searchTerm.length > 0) {
      filteredOptions = [
        {
          [optionKey]: this.state.searchTerm,
          type: 'CREATE',
        },
      ].concat(filteredOptions);
    }

    return filteredOptions;
  };
}

DropdownSearch.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  label: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  options: PropTypes.array,

  optionKey: PropTypes.string,
  noOptionsText: PropTypes.string,
  error: PropTypes.string,
  errorMessage: PropTypes.string,
  errorMsgClassName: PropTypes.string,
  hint: PropTypes.string,
  allowCreate: PropTypes.bool,
  allowClear: PropTypes.bool,
};

export default DropdownSearch;
