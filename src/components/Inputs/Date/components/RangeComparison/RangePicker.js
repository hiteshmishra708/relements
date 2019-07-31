import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import Calendar from "components/UI/Calendar";
import Inputs from "../Inputs";
import Comparison from "../Comparison";
import styles from "./RangePicker.scss";

export default class RangePicker extends React.Component {
  constructor(props) {
    super(props);

    const value = { ...this._getParsedValue(props.value) };
    value.compare = value.comparisonStartDate && value.comparisonEndDate;
    this.setState(value);

    this.state = {
      startDate: value.startDate,
      endDate: value.endDate,
      compare: value.compare,
      comparisonStartDate: value.comparisonStartDate,
      comparisonEndDate: value.comparisonEndDate,
      selectingKey: "startDate",
    };
    dayjs.extend(customParseFormat);
  }

  componentDidUpdate(nextProps) {
    if (this.props.active !== nextProps.active) {
      this.props.onChange({
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        comparisonStartDate: this.state.comparisonStartDate,
        comparisonEndDate: this.state.comparisonEndDate,
      });
    }
  }

  render() {
    const {
      startDate,
      endDate,
      comparisonStartDate,
      comparisonEndDate,
    } = this.state;

    let value = [{ from: startDate, to: endDate }];
    if (this.props.withComparison) {
      value = value.concat({
        from: comparisonStartDate,
        to: comparisonEndDate,
        color: "#f1c40f",
      });
    }

    const { prefixClassName } = this.props;

    return (
      <div className={`${styles.rangePicker} ${prefixClassName}`}>
        <div
          className={`${styles.rangePickerCalendarColumn} ${prefixClassName}-column`}
        >
          <Calendar
            value={value}
            onChange={this._handleCellClick}
            numMonths={2}
            prefixClassName={`${prefixClassName}-calendar`}
          />
        </div>
        <div
          className={`${styles.rangePickerCalendarColumn} ${prefixClassName}-column`}
        >
          <Inputs
            selectingKey={this.state.selectingKey}
            startDate={startDate}
            endDate={endDate}
            onChange={this._setDates}
            prefixClassName={`${prefixClassName}-column-inputs`}
            onFocus={key => {
              this.setState({ selectingKey: key });
            }}
          />
          {this.props.withComparison ? (
            <Comparison
              selectingKey={this.state.selectingKey}
              startDate={startDate}
              endDate={endDate}
              comparisonStartDate={comparisonStartDate}
              comparisonEndDate={comparisonEndDate}
              toggled={this.state.compare}
              onChange={this._setComparisonDates}
              prefixClassName={`${prefixClassName}-column-comparison`}
              onToggle={newCompare =>
                this.setState({
                  compare: newCompare,
                  selectingKey: "comparisonStartDate",
                  comparisonStartDate:
                    newCompare && startDate && endDate
                      ? startDate.subtract(
                          endDate.diff(startDate, "d") + 1,
                          "d",
                        )
                      : null,
                  comparisonEndDate:
                    newCompare && startDate && endDate
                      ? startDate.subtract(1, "d")
                      : null,
                })
              }
              onFocus={key => {
                this.setState({ selectingKey: key });
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }

  /**
   * On clicking the cell we want to start/end the range selection depending on the
   * current state
   * So if the current selection is startDate, we start endDate selection and so on
   * We use this.state.selectingKey to track this
   */
  _handleCellClick = day => {
    const { selectingKey } = this.state;
    if (selectingKey === "startDate") {
      this.setState({
        selectingKey: "endDate",
        endDate: null,
      });
    } else if (selectingKey === "comparisonStartDate") {
      const { startDate, endDate } = this.state;
      const numDays = endDate.diff(startDate, "d");
      this.setState({
        selectingKey: "comparisonStartDate",
        comparisonEndDate: day.add(numDays, "d"),
      });
    } else {
      this.setState({ selectingKey: "startDate" });
    }

    this.setState({ [selectingKey]: day });
  };

  /**
   * Sets the startDate and endDate
   * Also resets the month in focus to default
   */
  _setDates = (startDate, endDate) => {
    this.setState({
      startDate,
      endDate,
      selectingKey: "startDate",
    });
  };

  _setComparisonDates = (
    comparisonStartDate,
    comparisonEndDate,
    selectingKey = this.state.selectingKey,
  ) => {
    this.setState({
      comparisonStartDate,
      comparisonEndDate,
      selectingKey,
    });
  };

  _getParsedValue = () => {
    const { value = {} } = this.props;
    const startDate = dayjs(value.startDate);
    const endDate = dayjs(value.endDate);
    const comparisonStartDate = value.comparisonStartDate
      ? dayjs(value.comparisonStartDate)
      : null;
    const comparisonEndDate = value.comparisonEndDate
      ? dayjs(value.comparisonEndDate)
      : null;
    return {
      startDate,
      endDate,
      comparisonStartDate,
      comparisonEndDate,
    };
  };
}

RangePicker.propTypes = {
  active: PropTypes.bool,
  onChange: PropTypes.func,
  withComparison: PropTypes.bool,
  prefixClassName: PropTypes.string,
  value: PropTypes.shape({
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    comparisonStartDate: PropTypes.object,
    comparisonEndDate: PropTypes.object,
  }),
};

RangePicker.defaultProps = {
  onChange: () => {},
  withComparison: false,
  active: false,
  prefixClassName: "",
  value: {
    startDate: dayjs(),
    endDate: dayjs(),
    comparisonStartDate: null,
    comparisonEndDate: null,
  },
};
