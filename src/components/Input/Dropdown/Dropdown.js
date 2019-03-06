import React from "react";
import PropTypes from "prop-types";

import { KEY_CODES } from "constants";
import Icon from "components/Icon";
import AngleDownIcon from "icons/angle-down.svg";
import DropdownOptions from "./DropdownOptions";
import DropdownOption from "./DropdownOption";
import styles from "./Dropdown.scss";

class Dropdown extends React.Component {
  state = {
    active: false,
    focused: false,
    activeIndex: 0
  };

  _dropdownOptionsDOMs = [];

  componentDidMount() {
    this._calculateActiveIndex(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this._calculateActiveIndex(nextProps);
    }
  }

  render() {
    const {
      placeholder,
      className,
      value = "",
      label,
      options = [],
      optionKey = "text",
      noOptionsText,
      error,
      errorMessage,
      errorMsgClassName,
      hint
    } = this.props;

    const parsedValue = typeof value === "string" ? value : value[optionKey];

    const activeClassName = this.state.active ? styles.active : "";
    const focusedClassName = this.state.focused ? styles.focused : "";
    const errorClassName = error ? styles.error : "";
    let reverseModeClassName = "";
    if (
      this._DOMNode &&
      this._DOMNode.getBoundingClientRect().bottom + 150 > window.innerHeight
    ) {
      reverseModeClassName = styles.reverse;
    }

    return (
      <div className={`${styles.dropdown} ${className}`}>
        {label ? (
          <span
            className={`${
              styles.dropdownLabel
            } ${className}-label ${focusedClassName} ${errorClassName}`}
          >
            {label}
          </span>
        ) : null}
        {hint ? (
          <span className={`${styles.textHint} ${className}-hint`}>{hint}</span>
        ) : null}
        <div
          ref={DOMNode => {
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
            {parsedValue || <span>{placeholder}</span>}
          </div>
          <Icon src={{ default: AngleDownIcon }} />
        </div>
        {error && errorMessage && (
          <div
            className={`${styles.dropdownInputSubtext} ${errorMsgClassName}`}
          >
            {this._renderError(errorMessage)}
          </div>
        )}
        <DropdownOptions
          onClose={this._handleBlur}
          attachTo={this._DOMNode}
          active={this.state.active}
          focused={this.state.focused}
          reverseMode={this.props.reverseMode}
        >
          {options.length > 0 ? (
            options.map((option, i) => (
              <DropdownOption
                innerRef={DOMNode => {
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
            <span className={styles.dropdownInputZeroState}>
              {" "}
              {noOptionsText || "No options present"}{" "}
            </span>
          )}
        </DropdownOptions>
      </div>
    );
  }

  _renderError = error => {
    error = error || "Copy too long";
    return <span className={styles.dropdownInputSubtextError}>{error}</span>;
  };

  _handleKeyDown = e => {
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

  _changeActiveIndex = newIndex => {
    if (newIndex >= this.props.options.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = this.props.options.length - 1;
    }

    this._dropdownOptionsDOMs[newIndex].scrollIntoView(false);
    this.setState({ activeIndex: newIndex });
  };

  _calculateActiveIndex = props => {
    const { options, optionKey = "text", value } = props;
    options.map((option, i) => {
      if (value && option[optionKey] === value[optionKey]) {
        this.setState({ activeIndex: i });
      }
    });
  };

  _handleFocus = e => {
    this.props.onFocus && this.props.onFocus(e);
    // this._DOMNode.scrollIntoView();
    this._timeout = setTimeout(() => {
      this.setState({ active: true, focused: true });
    }, 300);
  };

  _handleBlur = e => {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this.setState({ active: false, focused: false });
    this.props.onBlur && this.props.onBlur(e);
  };

  _onDropdownClick = option => {
    this.setState({ active: false });
    this.props.onChange(option);
  };

  _toggleDropdown = () => {
    this.setState({ active: !this.state.active });
  };
}
Dropdown.defaultProps = {
  reverseMode: false
};
Dropdown.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
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
  reverseMode: PropTypes.bool
};

export default Dropdown;
