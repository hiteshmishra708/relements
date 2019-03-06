import React from 'react';
import PropTypes from 'prop-types';

import { KEY_CODES } from 'constants';
import RadioOption from './RadioOption';
import styles from './Radio.scss';

class Radio extends React.Component {
  static defaultProps = {
    optionKey: 'title',
  };

  state = {
    focused: false,
    activeIndex: this.props.initSelected ? 0 : -1,
  };

  componentDidMount() {
    this.props.options.map((option, i) => {
      if (option[this.props.optionKey] === (this.props.value || {}).title) {
        this.setState({ activeIndex: i });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    let found = false;
    nextProps.options.map((option, i) => {
      if (option[nextProps.optionKey] === (nextProps.value || {}).title) {
        found = true;
        this.setState({ activeIndex: i });
      }
    });

    if (!found) {
      this.setState({ activeIndex: -1 });
    }
  }

  render() {
    const {
      className, label, options = [], optionKey,
    } = this.props;

    const focusedClassName = this.state.focused ? styles.focused : '';
    return (
      <div className={`${styles.radio} ${className}`}>
        {label ? <span className={`${styles.radioLabel} ${focusedClassName}`}>{label}</span> : null}
        <div className={`${styles.radioOptions} ${className}-options`}>
          {options.map((option, i) => {
            return (
              <RadioOption
                selected={this.state.activeIndex === i}
                onClick={() => this._toggle(i)}
                hint={option.hint}
                optionClassname={`${option.className} ${className}-option`}
              >
                {option[optionKey]}
              </RadioOption>
            );
          })}
        </div>
      </div>
    );
  }

  _toggle = (index) => {
    this.setState({ activeIndex: index });
    this.props.onChange(this.props.options[index]);
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
        return this._onRadioClick(this.props.options[activeIndex]);
      default:
        return null;
    }
  };
}

Radio.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  optionKey: PropTypes.string,
  options: PropTypes.array,
  initSelected: PropTypes.bool,
};

export default Radio;
