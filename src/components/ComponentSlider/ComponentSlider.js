import React from 'react';
import ReactDOM from 'react-dom';
import { Portal } from 'react-portal';
import PropTypes from 'prop-types';

import Icon from 'components/Icon';
import AngleDownIcon from 'icons/angle-down.svg';

import { Activify } from 'decorators';
import { KEY_CODES } from 'constants/key_codes';
import styles from './ComponentSlider.scss';

// @Activify()
export default class ComponentSlider extends React.Component {
  _sliderElementRects = [];

  state = {
    currentLeft: 0,
    currentSlide: 0,
    offset: 0,
  };

  componentDidMount() {
    this._initialize();
  }

  render() {
    let { currentLeft } = this.state;
    const { currentSlide, offset } = this.state;
    const { centerMode, className } = this.props;
    const numberOfElements = this._getNumberOfChildren();
    const leftArrowDisabledClass = currentSlide === 0 ? styles.disabled : '';
    const rightArrowDisabledClass =
      currentSlide === numberOfElements - 1 || numberOfElements < 2 ? styles.disabled : '';
    if (currentSlide !== 0 && !centerMode) {
      currentLeft += -60;
    }
    return (
      <div ref={this._onSliderWrapperRef} className={`${styles.componentSliderWrapper} ${className}`}>
        <div
          onClick={this._prevSlide}
          className={`${styles.componentSliderArrow} ${styles.left} ${leftArrowDisabledClass}`}
        >
          <Icon className={styles.angleDownIcon} src={{ default: AngleDownIcon }} />
        </div>
        <div className={`${styles.componentSlider} ${leftArrowDisabledClass}`}>
          <div
            style={{
              transform: `translate3d(${-1 * (currentLeft - offset)}px, 0, 0)`,
            }}
            className={`${styles.componentSliderTrack}`}
          >
            {this._renderSliderElements()}
          </div>
        </div>
        <div
          onClick={this._nextSlide}
          className={`${styles.componentSliderArrow} ${styles.right} ${rightArrowDisabledClass}`}
        >
          <Icon className={styles.angleDownIcon} src={{ default: AngleDownIcon }} />
        </div>
      </div>
    );
  }

  _renderSliderElements() {
    return React.Children.map(this.props.children, (child, index) => {
      if (!child) return null;
      return (
        <div
          ref={sliderElement => this._onSliderElementRef(index, sliderElement)}
          className={`${styles.componentSliderItem}`}
        >
          {React.cloneElement(child, { active: index === this.state.currentSlide })}
        </div>
      );
    });
  }

  _getNumberOfChildren = () => {
    let count = 0;
    React.Children.forEach(this.props.children, (child) => {
      if (child) count += 1;
    });

    return count;
  };

  _onSliderWrapperRef = (sliderWrapper) => {
    if (!sliderWrapper) return;
    this._sliderWrapperRect = sliderWrapper.getBoundingClientRect();
  };

  _onSliderElementRef = (index, sliderElement) => {
    const DOMNode = ReactDOM.findDOMNode(sliderElement);
    if (!DOMNode) return;
    const DOMNodeRect = DOMNode.getBoundingClientRect();
    this._sliderElementRects[index] = DOMNodeRect;
  };

  _initialize = () => {
    if (this.props.centerMode) {
      const offset = this._sliderWrapperRect.width / 2;
      this.setState({ offset });
    }
    this.slideTo(this.props.initialSlide || 0);
  };

  _nextSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.slideTo(this.state.currentSlide + 1);
  };

  _prevSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.slideTo(this.state.currentSlide - 1);
  };

  slideTo = (index) => {
    const { centerMode, children, onChange } = this.props;
    const numberOfElements = React.Children.count(children);
    let slideToIndex = index;
    if (slideToIndex > numberOfElements - 1) {
      slideToIndex = numberOfElements - 1;
    } else if (slideToIndex < 0) {
      slideToIndex = 0;
    }
    let currentLeft = this._sliderElementRects.reduce((leftTotal, slideRect, i) => {
      if (i < index) leftTotal += slideRect.width;
      return leftTotal;
    }, 0);

    if (centerMode) {
      currentLeft += this._sliderElementRects[index].width / 2;
    }

    this.setState({ currentLeft, currentSlide: index }, () => {
      onChange && onChange(index);
    });
  };
}

ComponentSlider.propTypes = {
  children: PropTypes.node,
  centerMode: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  initialSlide: PropTypes.number,
};
