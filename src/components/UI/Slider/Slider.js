import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/UI/Icon';
import AngleDownIcon from 'icons/angle-down.svg';

import styles from './Slider.scss';
import useSlider from './hooks/useSlider';

const renderArrow = (className, onClick) => (
  <div onClick={onClick} className={`${styles.componentSliderArrow} ${className}`}>
    <Icon className={styles.angleDownIcon} src={AngleDownIcon} />
  </div>
);

const Slider = ({
  className, centerMode, children, onChange, initialSlide,
}) => {
  const {
    left, offset, slide, sliderWrapperRef, sliderElementRefs, slideTo, numElements,
  } = useSlider(children, {
    onChange,
    centerMode,
    initialSlide,
  });
  const leftArrowDisabledClass = slide === 0 ? styles.disabled : '';
  const rightArrowDisabledClass = slide === numElements - 1 || numElements < 2 ? styles.disabled : '';
  const transformStyle = { transform: `translate3d(${-1 * (left - offset)}px, 0, 0)` };

  return (
    <div ref={sliderWrapperRef} className={`${styles.componentSliderWrapper} ${className}`}>
      {renderArrow(`${styles.left} ${leftArrowDisabledClass}`, slideTo(slide - 1))}
      <div className={`${styles.componentSlider} ${leftArrowDisabledClass}`}>
        <div style={transformStyle} className={`${styles.componentSliderTrack}`}>
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
