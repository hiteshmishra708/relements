import React from 'react';
import PropTypes from 'prop-types';

import styles from './RangeSlider.scss';

class RangeSlider extends React.Component {
  constructor(props) {
    super(props);
    const knobPositionStart = this._translateFromPosition(props.value[0]);
    const knobPositionEnd = this._translateFromPosition(props.value[1]);
    this.state = {
      start: { knobPosition: knobPositionStart, knobPositionRounded: knobPositionStart },
      end: { knobPosition: knobPositionEnd, knobPositionRounded: knobPositionEnd },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value[0] !== nextProps.value[0] || this.props.value[1] !== nextProps.value[1]) {
      const knobPositionStart = this._translateFromPosition(nextProps.value[0]);
      const knobPositionEnd = this._translateFromPosition(nextProps.value[1]);
      this.setState({
        start: { knobPosition: knobPositionStart, knobPositionRounded: knobPositionStart },
        end: { knobPosition: knobPositionEnd, knobPositionRounded: knobPositionEnd },
      });
    }
  }

  render() {
    const { className, label, hint } = this.props;
    const startKnobPosition = this.state.start.knobPosition;
    const endKnobPosition = this.state.end.knobPosition;
    const trackWidth = endKnobPosition - startKnobPosition;

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
            <div className={styles.sliderFilled} style={{ width: `${trackWidth}%`, left: `${startKnobPosition}%` }} />
            {this.renderKnob('start')}
            {this.renderKnob('end')}
          </div>
        </div>
        <div className={styles.sliderTextInputs}>
          {this.renderInput('start')}
          {this.renderInput('end')}
        </div>
      </div>
    );
  }

  renderKnob(knobType) {
    const { knobPosition } = this.state[knobType];

    return (
      <div style={{ left: `${knobPosition}%` }} className={styles.sliderKnobWrapper}>
        <div
          style={{
            left: this.state.pointerX,
            top: this.state.pointerY,
          }}
          draggable
          onDragStart={this._startDragging(knobType)}
          onDrag={this._handleDrag(knobType)}
          onDragEnd={this._endDrag(knobType)}
          className={styles.sliderKnobGhost}
        />
        <div className={styles.sliderKnob} />
      </div>
    );
  }

  renderInput(knobType) {
    const value = this._translateToPosition(this.state[knobType].knobPositionRounded);
    return (
      <div className={styles.sliderTextInput}>
        <div className={styles.sliderTextInputLabel}>{knobType}</div>
        <input
          type="text"
          placeholder="enter..."
          value={value}
          // onChange={(e) => {
          //   const knobPosition = this._translateFromPosition(e.target.value);
          //   this.setState({
          //     [knobType]: { knobPosition, knobPositionRounded: knobPosition },
          //   });
          // }}
        />
      </div>
    );
  }

  _startDragging = () => () => {
    this.setState({ dragging: true });
  };

  _handleDrag = knobType => (e) => {
    const { pageX, pageY } = e;
    const trackRect = this._trackDOM.getBoundingClientRect();

    if (pageX <= 0) return;

    let knobPosition = ((pageX - trackRect.left) / trackRect.width) * 100;
    knobPosition = knobPosition < 0 ? 0 : knobPosition;
    knobPosition = knobPosition > 100 ? 100 : knobPosition;

    // const knobPositionRounded = Math.ceil(knobPosition / this.props.step) * this.props.step;
    const knobPositionRounded = knobPosition;

    if (knobType === 'start' && knobPosition > this.state.end.knobPosition - 1) {
      this.setState({
        pointerX: pageX,
        pointerY: pageY,
        start: {
          knobPosition,
          knobPositionRounded,
        },
        end: {
          knobPosition: knobPosition + 1,
          knobPositionRounded: knobPositionRounded + 1,
        },
      });
    } else if (knobType === 'end' && knobPosition < this.state.start.knobPosition + 1) {
      this.setState({
        pointerX: pageX,
        pointerY: pageY,
        start: {
          knobPosition: knobPosition - 1,
          knobPositionRounded: knobPositionRounded - 1,
        },
        end: {
          knobPosition,
          knobPositionRounded,
        },
      });
    } else {
      this.setState({
        pointerX: pageX,
        pointerY: pageY,
        [knobType]: {
          knobPosition,
          knobPositionRounded,
        },
      });
    }

    if (this.props.onDrag) {
      this.props.onDrag(this._translateToPosition(knobType, knobPosition));
    }
  };

  _endDrag = knobType => () => {
    const startValue = this._translateToPosition(this.state.start.knobPosition);
    const endValue = this._translateToPosition(this.state.end.knobPosition);
    this.props.onChange([startValue, endValue]);

    this.setState({
      pointerX: 0,
      pointerY: 0,
      [knobType]: {
        knobPosition: this.state[knobType].knobPositionRounded,
        knobPositionRounded: this.state[knobType].knobPositionRounded,
      },
      dragging: false,
    });
  };

  _translateToPosition = (knobValue) => {
    const { start, end, step } = this.props;
    const value = start + (knobValue / 100) * (end - start);
    return Math.ceil(value / step) * step;
  };

  _translateFromPosition = (position) => {
    const { start, end } = this.props;
    return (100 * (position - start)) / (end - start);
  };
}

RangeSlider.propTypes = {
  className: PropTypes.string,
  value: PropTypes.array,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onDrag: PropTypes.func,
  hint: PropTypes.string,
  start: PropTypes.number,
  end: PropTypes.number,
  step: PropTypes.number,
};

export default RangeSlider;
