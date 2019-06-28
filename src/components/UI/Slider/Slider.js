import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/UI/Icon';
import AngleDownIcon from 'icons/angle-down.svg';

import styles from './Slider.scss';

// @Activify()

const getNumChildren = (children) => {
  let count = 0;
  React.Children.forEach(children, (child) => {
    if (child) count += 1;
  });

  return count;
};

const renderArrow = (className, onClick) => (
  <div onClick={onClick} className={`${styles.componentSliderArrow} ${className}`}>
    <Icon className={styles.angleDownIcon} src={AngleDownIcon} />
  </div>
);

const Slider = ({
  className, centerMode, children, onChange, initialSlide,
}) => {
  const [left, setLeft] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [slide, setSlide] = React.useState(0);
  const sliderWrapperRef = React.useRef();
  const numberOfElements = getNumChildren(children);
  const sliderElementRefs = new Array(numberOfElements).fill(0).map(() => React.createRef());

  const slideTo = React.useCallback(index => (e) => {
    let slideToIndex = index;

    if (slideToIndex > numberOfElements - 1) {
      slideToIndex = numberOfElements - 1;
    } else if (slideToIndex < 0) {
      slideToIndex = 0;
    }

    let left = sliderElementRefs.reduce((leftTotal, elementRef, i) => {
      if (i < index) leftTotal += elementRef.current.getBoundingClientRect().width;
      return leftTotal;
    }, 0);

    if (centerMode) {
      left += sliderElementRefs[index].current.getBoundingClientRect().width / 2;
    } else if (slideToIndex !== 0) {
      left += -60;
    }

    setLeft(left);
    setSlide(slideToIndex);
    onChange && onChange(slideToIndex);
  });

  React.useEffect(() => {
    if (centerMode) {
      const offset = sliderWrapperRef.current.getBoundingClientRect().width / 2;
      setOffset(offset);
    }
    slideTo(initialSlide || 0);
  }, [sliderWrapperRef.current]);

  const leftArrowDisabledClass = slide === 0 ? styles.disabled : '';
  const rightArrowDisabledClass = slide === numberOfElements - 1 || numberOfElements < 2 ? styles.disabled : '';
  const transformStyle = { transform: `translate3d(${-1 * (left - offset)}px, 0, 0)` };

  return (
    <div ref={sliderWrapperRef} className={`${styles.componentSliderWrapper} ${className}`}>
      {renderArrow(`${styles.left} ${leftArrowDisabledClass}`, slideTo(slide - 1))}
      <div className={`${styles.componentSlider} ${leftArrowDisabledClass}`}>
        <div
          style={transformStyle}
          className={`${styles.componentSliderTrack}`}
        >
          {React.Children.map(children, (child, index) => {
            if (!child) return null;
            return (
              <div ref={sliderElementRefs[index]} className={`${styles.componentSliderItem}`}>
                {React.cloneElement(child, { active: index === slide })}
              </div>
            );
          })}
        </div>
      </div>
      {renderArrow(`${styles.right} ${rightArrowDisabledClass}`, slideTo(slide + 1))}
    </div>
  );
};

Slider.propTypes = {
  children: PropTypes.node,
  centerMode: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  initialSlide: PropTypes.number,
};

export default Slider;
