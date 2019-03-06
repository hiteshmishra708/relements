import React from 'react';
import PropTypes from 'prop-types';

import styles from './Slider.scss';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    const knobPosition = this._translateFromPosition(props.value || props.start);
    this.state = { knobPosition, knobPositionRounded: knobPosition };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      const knobPosition = this._translateFromPosition(nextProps.value || nextProps.start);
      this.setState({ knobPosition, knobPositionRounded: knobPosition });
    }
  }

  render() {
    const {
      className, label, hint, start, end, renderTag,
    } = this.props;
    const startActiveClassName = this.state.knobPosition > 5 ? styles.active : '';
    const endActiveClassName = this.state.knobPosition < 95 ? styles.active : '';

    return (
      <div className={`${styles.slider} ${className}`}>
        <span className={`${styles.sliderLabel}`}>{label}</span>
        {hint ? <span className={`${styles.textHint}`}>{hint}</span> : null}
        <div className={styles.sliderInput}>
          <div
            className={styles.sliderTrack}
            ref={(DOMElement) => {
              this._trackDOM = DOMElement;
            }}
          >
            <div className={`${styles.sliderInputTextStart} ${startActiveClassName}`}>
              {renderTag ? renderTag(start) : start}
            </div>
            <div className={`${styles.sliderInputTextEnd} ${endActiveClassName}`}>
              {renderTag ? renderTag(end) : end}
            </div>
            <div className={styles.sliderFilled} style={{ width: `${this.state.knobPosition}%` }} />
            <div style={{ left: `${this.state.knobPosition}%` }} className={styles.sliderKnobWrapper}>
              <div
                style={{
                  left: this.state.pointerX,
                  top: this.state.pointerY,
                }}
                draggable
                onDragStart={this._startDragging}
                onDrag={this._handleDrag}
                onDragEnd={this._endDrag}
                className={styles.sliderKnobGhost}
              />
              <div className={styles.sliderKnob} />
              <div className={styles.sliderKnobText}>
                {renderTag
                  ? renderTag(this._translateToPosition(this.state.knobPositionRounded))
                  : this.state.knobPosition}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  _startDragging = () => {
    this.setState({ dragging: true });
  };

  _handleDrag = (e) => {
    const { pageX, pageY } = e;
    const trackRect = this._trackDOM.getBoundingClientRect();

    if (pageX <= 0) return;

    let knobPosition = (pageX - trackRect.left) / trackRect.width * 100;
    knobPosition = knobPosition < 0 ? 0 : knobPosition;
    knobPosition = knobPosition > 100 ? 100 : knobPosition;
    const knobPositionRounded = Math.ceil(knobPosition / this.props.step) * this.props.step;
    this.setState({
      knobPosition,
      pointerX: pageX,
      pointerY: pageY,
      knobPositionRounded,
    });

    if (this.props.onDrag) {
      this.props.onDrag(this._translateToPosition(knobPosition));
    }
  };

  _endDrag = () => {
    const value = this._translateToPosition(this.state.knobPosition);
    this.props.onChange(value);

    this.setState({
      pointerX: 0,
      pointerY: 0,
      knobPosition: this.state.knobPositionRounded,
      dragging: false,
    });
  };

  _translateToPosition = (knobValue) => {
    const { start, end, step } = this.props;
    const value = start + knobValue / 100 * (end - start);
    return Math.ceil(value / step) * step;
  };

  _translateFromPosition = (position) => {
    const { start, end } = this.props;
    return 100 * (position - start) / (end - start);
  };
}

Slider.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onDrag: PropTypes.func,
  renderTag: PropTypes.func,
  hint: PropTypes.string,
  start: PropTypes.number,
  end: PropTypes.number,
  step: PropTypes.number,
};

export default Slider;
