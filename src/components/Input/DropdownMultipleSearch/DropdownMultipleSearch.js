import React from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';

import { KEY_CODES } from 'constants';
import Icon from 'components/Icon';
import AngleDownIcon from 'icons/angle-down.svg';
import CrossIcon from 'icons/close.svg';
import DropdownOptions from '../Dropdown/DropdownOptions';
import DropdownOption from '../Dropdown/DropdownOption';
import styles from './DropdownMultipleSearch.scss';

class DropdownMultipleSearch extends React.Component {
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
    keys: ['text'],
  };

  _dropdownOptionsDOMs = [];

  componentDidMount() {
    this._setupSearch();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.options && nextProps.options) {
      this._setupSearch(nextProps);
    } else if (this.props.options.length !== nextProps.options.length) {
      this._setupSearch(nextProps);
    }
  }

  render() {
    const {
      className, label, noOptionsText, error, optionKey = 'text',
    } = this.props;

    const filteredOptions = this._getFilteredOptions(this.state.searchResults);

    const activeClassName = this.state.active ? styles.active : '';
    const focusedClassName = this.state.focused ? styles.focused : '';
    const errorClassName = error ? styles.error : '';

    let reverseModeClassName = '';
    if (this._DOMNode && this._DOMNode.getBoundingClientRect().bottom + 150 > window.innerHeight) {
      reverseModeClassName = styles.reverse;
    }

    return (
      <div className={`${styles.dropdown} ${className}`}>
        {label ? (
          <span className={`${styles.dropdownLabel} ${focusedClassName} ${errorClassName}`}>{label}</span>
        ) : null}
        <div
          ref={(DOMNode) => {
            this._DOMNode = DOMNode;
          }}
          tabIndex={this.props.tabIndex || '0'}
          onKeyDown={this._handleKeyDown}
          onFocus={this._handleFocus}
          // onBlur={this._handleBlur}
          onMouseDown={this._toggleDropdown}
          className={`${
            styles.dropdownInputWrapper
          } ${activeClassName} ${focusedClassName} ${errorClassName} ${reverseModeClassName}`}
        >
          <div className={styles.dropdownInput}>{this._renderValues()}</div>
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
    );
  };

  _renderError = (error) => {
    error = error || 'Copy too long';
    return <span className={styles.dropdownInputSubtextError}>{error}</span>;
  };

  _addChip = (valueItem) => {
    const value = this.props.value.concat([valueItem]);
    this.props.onChange(value);
    this.setState({ searchTerm: '', searchResults: this.props.options });
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
        return this._onDropdownClick(this._getFilteredOptions(this.state.searchResults)[activeIndex]);
      case KEY_CODES.BACKSPACE:
        if (this.state.searchTerm.length !== 0) return;
        e.preventDefault();
        return this._deleteChip(e, null, this.props.value.length - 1);
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
    this._inputDOM.blur();
    this.setState({ active: false, focused: false });
    this.props.onBlur && this.props.onBlur(e);
  };

  _onDropdownClick = (option) => {
    if (!option) return;
    this._addChip(option);
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
    const { value = [], optionKey = 'text' } = this.props;
    const flatValue = value.map(valueItem => valueItem[optionKey]);
    return options.filter(option => !flatValue.includes(option[optionKey]));
  };
}

DropdownMultipleSearch.propTypes = {
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

export default DropdownMultipleSearch;
