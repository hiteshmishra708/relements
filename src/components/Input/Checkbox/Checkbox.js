import React from 'react';
import PropTypes from 'prop-types';

import { KEY_CODES } from 'constants';
import CheckboxOption from './CheckboxOption';
import styles from './Checkbox.scss';

class Checkbox extends React.Component {
  state = {
    active: false,
    focused: false,
    activeIndexes: [],
  };

  componentDidMount() {
    const activeIds = this.props.value.map(valueItem => valueItem.title);
    const activeIndexes = [];
    this.props.options.map((option, i) => {
      if (activeIds.includes(option.title)) {
        activeIndexes.push(i);
      }
    });
    this.setState({ activeIndexes });
  }

  componentWillReceiveProps(nextProps) {
    const activeIds = nextProps.value.map(valueItem => valueItem.title);
    const activeIndexes = [];
    nextProps.options.map((option, i) => {
      if (activeIds.includes(option.title)) {
        activeIndexes.push(i);
      }
    });
    this.setState({ activeIndexes });
  }

  render() {
    const {
      placeholder, className, value, label, hint, options = [],
    } = this.props;

    const activeClassName = this.state.active ? styles.active : '';
    const focusedClassName = this.state.focused ? styles.focused : '';
    return (
      <div className={`${styles.checkbox} ${className}`}>
        {label ? <span className={`${styles.checkboxLabel} ${focusedClassName}`}>{label}</span> : null}
        {hint ? <span className={`${styles.checkboxHint} ${focusedClassName}`}>{hint}</span> : null}
        <div className={styles.checkboxOptions}>
          {this.props.options.map((option, i) => {
            return (
              <CheckboxOption selected={this.state.activeIndexes.includes(i)} onClick={e => this._toggle(i)}>
                {option.title}
              </CheckboxOption>
            );
          })}
        </div>
      </div>
    );
  }

  _toggle = (index) => {
    const activeIndexes = this.state.activeIndexes;
    const indexPosition = activeIndexes.indexOf(index);
    if (indexPosition > -1) {
      activeIndexes.splice(indexPosition, 1);
    } else {
      activeIndexes.push(index);
    }
    this.setState({ activeIndexes });

    const onChangeValue = [];
    this.state.activeIndexes.map((activeIndex) => {
      onChangeValue.push(this.props.options[activeIndex]);
    });

    this.props.onChange(onChangeValue);
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
        return this._onCheckboxClick(this.props.options[activeIndex]);
      default:
        return null;
    }
  };
}

Checkbox.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  options: PropTypes.array,
};

export default Checkbox;
