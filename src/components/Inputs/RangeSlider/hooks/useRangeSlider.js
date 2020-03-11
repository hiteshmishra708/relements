import React, { useState, useEffect } from "react";
import { KEY_CODES } from "constants";
import styles from "./useRangeSlider.scss";

export const toPosition = (start, end, step) => position => {
  const value = start + (position / 100) * (end - start);
  return Math.round(value / step) * step;
};

export const fromPosition = (start, end) => position => {
  return (100 * (position - start)) / (end - start);
};

export const getKnobPosition = ({ pageX, trackRect }) => {
  let knobPosition = ((pageX - trackRect.left) / trackRect.width) * 100;
  knobPosition = knobPosition < 0 ? 0 : knobPosition;
  knobPosition = knobPosition > 100 ? 100 : knobPosition;
  return knobPosition;
};

export function useRangeSlider({
  value,
  start,
  end,
  onChange,
  step,
  trackRef,
  single,
  onDrag,
  placeholder,
  startPlaceholder,
  endPlaceholder,
  renderInputValue,
  translateInputValue,
}) {
  const [startPosition, setStartPosition] = useState({});
  const [endPosition, setEndPosition] = useState({});
  const [pointerX, setPointerX] = useState();
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [dragging, setDragging] = useState();

  const translateToPosition = toPosition(start, end, step);
  const translateFromPosition = fromPosition(start, end);
  const startDragging = () => () => setDragging(true);

  const handleDrag = knobType => e => {
    let pageX;
    if (e.target.dragTest) {
      pageX = e.target.pageX;
    } else {
      pageX = e.pageX;
    }
    const trackRect = trackRef.current.getBoundingClientRect();

    if (pageX <= 0) return;

    const knobPosition = getKnobPosition({ pageX, trackRect });
    const knobPositionRounded = knobPosition;

    if (knobType === "start" && knobPosition > endPosition.exact - 1) {
      setPointerX(pageX);
      setStartPosition({ exact: knobPosition, rounded: knobPositionRounded });
      setEndPosition({
        exact: knobPosition + 1,
        rounded: knobPositionRounded + 1,
      });
    } else if (knobType === "end" && knobPosition < startPosition.exact + 1) {
      setPointerX(pageX);
      setStartPosition({
        exact: knobPosition - 1,
        rounded: knobPositionRounded - 1,
      });
      setEndPosition({ exact: knobPosition, rounded: knobPositionRounded });
    } else {
      setPointerX(pageX);
      const setter = knobType === "start" ? setStartPosition : setEndPosition;
      setPointerX(pageX);
      setter({ exact: knobPosition, rounded: knobPositionRounded });
    }

    if (onDrag) {
      onDrag(translateToPosition(knobPosition));
    }
  };

  const endDrag = knobType => () => {
    const startValue = translateToPosition(startPosition.exact);
    const endValue = translateToPosition(endPosition.exact);

    if (single) onChange(endValue);
    else onChange([startValue, endValue]);

    const setter = knobType === "start" ? setStartPosition : setEndPosition;
    const currentPosition = knobType === "start" ? startPosition : endPosition;
    setPointerX(0);
    setDragging(false);
    setter({
      exact: currentPosition.rounded,
      rounded: currentPosition.rounded,
    });
  };

  const onKnobValueChange = (isStartKnob, knobValue, knobPosition) => {
    let newValue = knobValue;
    let newPosition = knobPosition;

    if (knobValue > end) newValue = end;
    if (knobValue < 0) newValue = 0;
    if (newPosition > 100) newPosition = 100;
    if (newPosition < 0) newPosition = 0;

    const setter = isStartKnob
      ? { setValue: setStartValue, setPosition: setStartPosition }
      : { setValue: setEndValue, setPosition: setEndPosition };
    setter.setValue(newValue);
    setter.setPosition({ exact: newPosition, rounded: newPosition });

    if (single) onChange(newValue);
    else {
      const startValue = translateToPosition(startPosition.exact);
      const endValue = translateToPosition(endPosition.exact);
      isStartKnob
        ? onChange([newValue, endValue])
        : onChange([startValue, newValue]);
    }
  };

  const changeKnobPosition = (knobType, value) => {
    const isStartKnob = knobType === "start";
    const knobPosition = translateFromPosition(value);
    const knobValue = translateToPosition(knobPosition);
    onKnobValueChange(isStartKnob, knobValue, knobPosition);
  };

  const handleKeyDown = knobType => (value, e) => {
    switch (e.keyCode) {
      case KEY_CODES.ESC:
      case KEY_CODES.TAB:
        changeKnobPosition(knobType, value);
        break;
      case KEY_CODES.ENTER:
        e.preventDefault();
        changeKnobPosition(knobType, value);
        break;
      default:
    }
  };

  const handleBlur = knobType => value => changeKnobPosition(knobType, value);

  const renderKnob = (knobType, prefixClassName) => {
    const knobPosition =
      knobType === "start" ? startPosition.exact : endPosition.exact;
    const className = prefixClassName
      ? `${prefixClassName}-${knobType}-knob`
      : "";
    return (
      <div
        style={{ left: `${knobPosition}%` }}
        className={`${styles.sliderKnobWrapper} ${className}`}
      >
        <div
          style={{ left: pointerX }}
          draggable
          onDragStart={startDragging(knobType)}
          onDrag={handleDrag(knobType)}
          onDragEnd={endDrag(knobType)}
          className={styles.sliderKnobGhost}
        />
        <div className={styles.sliderKnob} />
      </div>
    );
  };

  const useValue = knobType => {
    let inputValue;
    let knobPositionRounded;
    let setter;
    let inputPlaceholder;
    if (knobType === "start") {
      inputValue = startValue.value;
      knobPositionRounded = startPosition.rounded;
      setter = setStartValue;
      inputPlaceholder = startPlaceholder || knobType;
    } else if (knobType === "end") {
      inputValue = endValue.value;
      knobPositionRounded = endPosition.rounded;
      setter = setEndValue;
      inputPlaceholder = endPlaceholder || knobType;
    }
    const value =
      inputValue || (!knobPositionRounded && knobPositionRounded !== 0)
        ? inputValue
        : translateToPosition(knobPositionRounded);
    return [value, setter, inputPlaceholder];
  };

  const renderInput = (knobType, prefixClassName) => {
    const [value, setter, inputPlaceholder] = useValue(knobType);
    const [renderValue, setRenderValue] = useState();

    useEffect(() => {
      if (value !== undefined) {
        setRenderValue(renderInputValue ? renderInputValue(value) : value);
      }
    }, [value]);

    const className = prefixClassName
      ? `${prefixClassName}-${knobType}-input`
      : "";

    const reflectKeyPressedWrapper = wrapped => e => {
      if (
        e.keyCode === KEY_CODES.ESC ||
        e.keyCode === KEY_CODES.TAB ||
        e.keyCode === KEY_CODES.ENTER
      )
        wrapped(e);
    };

    const reflectInput = handler => e => {
      const isIntegerOnly = Number.isInteger(step);
      const isIntegerInput = Number.isInteger(parseFloat(renderValue));
      const isFloatInput = !Number.isNaN(parseFloat(renderValue));
      const isTranslatedInput = translateInputValue && renderInputValue;
      const currentValue = value;

      // resets to previous valid value for invalid inputs
      const convertInputValue = value => {
        if (isIntegerOnly && isIntegerInput) return parseInt(value, 10);
        if (!isIntegerOnly && isFloatInput) return value;
        return currentValue;
      };

      const inputValue = isTranslatedInput
        ? translateInputValue(renderValue, currentValue)
        : convertInputValue(renderValue);

      const currentRenderValue = isTranslatedInput
        ? renderInputValue(currentValue)
        : currentValue;

      const handleInvalidInput = () => {
        const isValidFloatInput =
          !isIntegerOnly && !Number.isInteger(inputValue / step);
        if (isValidFloatInput) return [currentValue, currentRenderValue];

        // only for custom input where some partial representation is of equal value to the current value
        const isPartiallyValidInput =
          isTranslatedInput &&
          currentValue === inputValue &&
          currentRenderValue !== renderValue;
        if (isPartiallyValidInput) return [inputValue, currentRenderValue];

        // empty input resets to previos valid input
        const isEmptyInput = !isTranslatedInput && inputValue === "";
        if (isEmptyInput) return [currentValue, currentRenderValue];

        // out of range values capped to start or end values depends on bound violation
        const isNumberInput = !Number.isNaN(Number(inputValue));
        const hitsLowerBound = isNumberInput && inputValue < start;
        const hitsUpperBound = isNumberInput && inputValue > end;

        const capInput = () => {
          if (hitsUpperBound) return end;
          if (hitsLowerBound) return start;
          return inputValue;
        };
        const cappedInput = capInput();

        if ((hitsLowerBound || hitsUpperBound) && isTranslatedInput)
          return [cappedInput, renderInputValue(cappedInput)];
        if (hitsLowerBound || hitsUpperBound) return [cappedInput, cappedInput];

        // ensures start input does not cross or equates to end input and vice versa
        const hitsStart =
          knobType === "start" &&
          !single &&
          Math.round(inputValue) >= translateToPosition(endPosition.rounded);

        const hitsEnd =
          knobType === "end" &&
          !single &&
          Math.round(inputValue) <= translateToPosition(startPosition.rounded);

        if (hitsStart || hitsEnd) return [currentValue, currentRenderValue];
        if (isTranslatedInput) return [inputValue, renderValue];
        return [inputValue, inputValue];
      };

      const shouldUpdateValue = newValue => newValue !== value;
      const shouldUpdateRenderValue = newRenderValue =>
        newRenderValue !== renderValue;
      const updateValue = value => {
        setter({ value });
        handler(value, e);
      };
      const [newValue, newRenderValue] = handleInvalidInput();
      shouldUpdateValue(newValue) && updateValue(newValue);
      shouldUpdateRenderValue(newRenderValue) && setRenderValue(newRenderValue);
    };

    const onKeyDown = reflectKeyPressedWrapper(
      reflectInput(handleKeyDown(knobType)),
    );
    const onBlur = reflectInput(handleBlur(knobType));
    const onChange = e => setRenderValue(e.target.value);

    return (
      <div className={styles.sliderTextInput}>
        <div className={styles.sliderTextInputLabel}>{inputPlaceholder}</div>
        <input
          type="text"
          placeholder={placeholder || "enter..."}
          value={renderValue}
          onKeyDown={onKeyDown}
          className={className}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    );
  };

  const setPositions = (start = 0, end) => {
    const knobPositionStart = translateFromPosition(start);
    const knobPositionEnd = translateFromPosition(end);
    setStartPosition({ exact: knobPositionStart, rounded: knobPositionStart });
    setEndPosition({ exact: knobPositionEnd, rounded: knobPositionEnd });
  };

  useEffect(() => {
    single ? setPositions(0, value) : setPositions(value[0], value[1]);
  }, [value, value && value[0], value && value[1]]);

  const trackWidth = endPosition.exact - startPosition.exact;
  return {
    dragging,
    trackWidth,
    trackOffset: startPosition.exact,
    renderKnob,
    renderInput,
  };
}
