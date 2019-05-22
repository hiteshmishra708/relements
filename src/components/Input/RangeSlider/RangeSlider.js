import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useRangeSlider } from './hooks/useRangeSlider';
import { useInput } from '../_common/hooks/useInput';
import { Label } from '../_common/Label';
import styles from './RangeSlider.scss';

function RangeSlider({
  className,
  prefixClassName,
  placeholder,
  label,
  value,
  onFocus,
  onBlur,
  onDrag,
  onChange,
  error,
  single,
  start,
  end,
  step,
}) {
  const _TextInputDOM = useRef();
  const _TrackDOM = useRef();
  const { focused, handleFocus, handleBlur } = useInput(_TextInputDOM, onFocus, onBlur);
  const {
    trackWidth, trackOffset, renderKnob, renderInput,
  } = useRangeSlider({
    value,
    start,
    end,
    onChange,
    step,
    trackRef: _TrackDOM,
    single,
    onDrag,
    placeholder,
  });

  return (
    <div tabIndex="0" onFocus={handleFocus} onBlur={handleBlur} className={`${styles.slider} ${className}`}>
      <Label focused={focused} error={error} className={`${styles.sliderLabel} ${prefixClassName}-label`}>
        {label}
      </Label>
      <div className={styles.sliderInput}>
        <div className={styles.sliderTrack} ref={_TrackDOM}>
          <div className={styles.sliderFilled} style={{ width: `${trackWidth}%`, left: `${trackOffset}%` }} />
          {single ? null : renderKnob('start')}
          {renderKnob('end')}
        </div>
      </div>
      <div className={styles.sliderTextInputs}>
        {single ? null : renderInput('start')}
        {renderInput('end')}
      </div>
    </div>
  );
}

RangeSlider.propTypes = {
  className: PropTypes.string,
  end: PropTypes.number,
  error: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onDrag: PropTypes.func,
  onFocus: PropTypes.func,
  prefixClassName: PropTypes.string,
  single: PropTypes.bool,
  start: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
};

RangeSlider.defaultProps = {
  className: '',
  placeholder: '',
  end: 0,
  error: false,
  label: '',
  onBlur: () => {},
  onChange: () => {},
  onDrag: () => {},
  onFocus: () => {},
  prefixClassName: '',
  single: false,
  start: 0,
  step: 0,
};

export default RangeSlider;
