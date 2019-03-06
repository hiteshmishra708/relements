import React from 'react';
import PropTypes from 'prop-types';

import TabOption from './TabOption';
import styles from './Tab.scss';

class Tab extends React.Component {
  state = {
    activeIndex: 0,
    DOMRects: [],
  };

  _TabOptionDOMs = [];

  componentDidMount() {
    this.props.options.map((option, i) => {
      if (option === this.props.value) {
        setTimeout(() => this._toggle(i, true), 100);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    nextProps.options.map((option, i) => {
      if (option === (nextProps.value || '')) {
        this._toggle(i, true);
      }
    });
  }

  render() {
    const {
      className, label, options = [], hint, disabled,
    } = this.props;
    const { width, offset } = this._getPosition();
    const disabledClassName = disabled ? styles.disabled : '';

    return (
      <div className={`${styles.tab} ${className}`}>
        <span className={`${styles.tabLabel}`}>{label}</span>
        {hint ? <span className={`${styles.textHint}`}>{hint}</span> : null}
        <div className={`${styles.tabOptionsWrapper} ${disabledClassName}`}>
          <div className={styles.tabOptions}>
            {options.map((option, i) => {
              return (
                <TabOption
                  innerRef={this._addDOMElementToStack(i)}
                  selected={this.state.activeIndex === i}
                  onClick={() => this._toggle(i)}
                >
                  {this._getOption(option)}
                </TabOption>
              );
            })}
          </div>
          <div className={styles.tabOptionsBG} style={{ width, left: offset }} />
        </div>
      </div>
    );
  }

  _getOption = (option) => {
    if (typeof option === 'string') {
      return option;
    }
    return option[this.props.optionKey || 'name'];
  };

  _addDOMElementToStack = index => (DOMElement) => {
    if (DOMElement) {
      const DOMElementRect = DOMElement.getBoundingClientRect();
      const currentRect = this.state.DOMRects[index];

      if (!currentRect || currentRect.width !== DOMElementRect.width) {
        const DOMRects = this.state.DOMRects;
        DOMRects[index] = DOMElementRect;
        this.setState({ DOMRects });
      }
    }
  };

  _getPosition = () => {
    let offset = 0;
    let width = 0;
    this.state.DOMRects.map((DOMElementRect, i) => {
      if (i === this.state.activeIndex) {
        width = DOMElementRect.width;
      } else if (i < this.state.activeIndex) {
        offset += DOMElementRect.width;
      }
    });

    return { width, offset };
  };

  _toggle = (index, isInitCall) => {
    this.setState({ activeIndex: index });
    if (!isInitCall) this.props.onChange(this.props.options[index]);
  };
}

Tab.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.array,
  optionKey: PropTypes.string,
};

export default Tab;
