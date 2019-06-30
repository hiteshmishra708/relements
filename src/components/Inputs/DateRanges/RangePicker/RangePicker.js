import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import Icon from 'components/UI/Icon';
import Button from 'components/UI/Button';
import Checkbox from 'components/Inputs/Checkbox';
import styles from './RangePicker.scss';

const LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export default class RangePicker extends React.Component {
  constructor() {
    super();

    const today = dayjs();
    this.state = {
      startDate: today,
      endDate: today,
      compare: false,
      comparisonStartDate: null,
      comparisonEndDate: null,
      focusedDate: today,

      isSelecting: false,
      selectingKey: 'startDate',
    };
    dayjs.extend(customParseFormat);
  }

  componentDidMount() {
    const value = { ...this.props.value };
    value.compare = value.comparisonStartDate && value.comparisonEndDate;
    this.setState(value);
  }

  componentDidUpdate(nextProps, prevState) {
    if (
      this.state.startDate !== prevState.startDate ||
      this.state.endDate !== prevState.endDate ||
      this.state.comparisonStartDate !== prevState.comparisonStartDate ||
      this.state.comparisonEndDate !== prevState.comparisonEndDate
    ) {
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
      compare,
      focusedDate,
    } = this.state;
    return (
      <div className={styles.rangePicker}>
        <div className={styles.rangePickerCalendarColumn}>
          <Icon
            src="angle-down"
            className={styles.navigationIcon}
            onClick={this._decreaseFocusedDate}
          />
          <Icon
            src="angle-down"
            className={`${styles.navigationIcon} ${styles.right}`}
            onClick={this._increaseFocusedDate}
          />
          {this.renderCalendar(focusedDate.subtract(1, 'month'))}
          {this.renderCalendar(focusedDate)}
        </div>
        <div className={styles.rangePickerInputColumn}>
          <div className={styles.rangePickerInputColumnLabel}>Select Date</div>
          <div className={styles.rangePickerInputColumnHint}>
            Tap on the calendar to define custom date ranges
          </div>
          {this.renderMainButtons(startDate, endDate)}
          <div className={styles.rangePickerInputs}>
            {this.renderInput({
              label: 'Start',
              value: startDate,
              key: 'startDate',
            })}
            {this.renderInput({
              label: 'End',
              value: endDate,
              className: styles.endInput,
              key: 'endDate',
            })}
          </div>
          <Checkbox.Item
            value={compare}
            onChange={newCompare =>
              this.setState({
                compare: newCompare,
                selectingKey: 'comparisonStartDate',
                comparisonStartDate:
                  newCompare && startDate && endDate
                    ? startDate.subtract(endDate.diff(startDate, 'd') + 1, 'd')
                    : null,
                comparisonEndDate:
                  newCompare && startDate && endDate
                    ? startDate.subtract(1, 'd')
                    : null,
              })
            }
            className={styles.rangePickerCheckbox}
          >
            Compare
          </Checkbox.Item>
          {compare ? (
            <React.Fragment>
              {this.renderCompareButtons(
                comparisonStartDate,
                comparisonEndDate
              )}
              <div className={styles.rangePickerInputs}>
                {this.renderInput({
                  label: 'Start',
                  value: comparisonStartDate,
                  key: 'comparisonStartDate',
                  className: styles.compare,
                })}
                {this.renderInput({
                  label: 'End',
                  value: comparisonEndDate,
                  key: 'comparisonEndDate',
                  disabled: true,
                  className: `${styles.compare} ${styles.endInput}`,
                })}
              </div>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    );
  }

  renderInput({ label, value, className, key, disabled }) {
    const date = dayjs.isDayjs(value)
      ? dayjs(value).format('DD MMM, YYYY')
      : '';
    const focusedClassName =
      this.state.selectingKey === key ? styles.focused : '';
    return (
      <div
        className={`${styles.rangePickerInput} ${className} ${className} ${focusedClassName}`}
      >
        <span className={`${styles.rangePickerInputLabel}`}>{label}</span>
        <input
          onFocus={() =>
            this.setState({
              selectingKey: key,
              isSelecting: ['endDate', 'comparisonEndDate'].includes(key),
            })
          }
          value={date}
          className={`${styles.rangePickerInputField}`}
          placeholder="Selecting"
          disabled={disabled}
        />
      </div>
    );
  }

  renderMainButtons(startDate, endDate) {
    const {
      isToday,
      isYesterday,
      isLast7Days,
      isLast30Days,
    } = this._getDateStats(startDate, endDate);

    const today = dayjs();
    return (
      <div className={styles.rangePickerButtons}>
        <Button
          primary={isToday}
          className={styles.rangePickerButton}
          onClick={() => this._setDates(today, today)}
        >
          Today
        </Button>
        <Button
          primary={isYesterday}
          className={styles.rangePickerButton}
          onClick={() =>
            this._setDates(today.subtract(1, 'd'), today.subtract(1, 'd'))
          }
        >
          Yesterday
        </Button>
        <Button
          primary={isLast7Days}
          className={styles.rangePickerButton}
          onClick={() => this._setDates(today.subtract(6, 'd'), today)}
        >
          Last 7 Days
        </Button>
        <Button
          primary={isLast30Days}
          className={styles.rangePickerButton}
          onClick={() => this._setDates(today.subtract(29, 'd'), today)}
        >
          Last 30 Days
        </Button>
      </div>
    );
  }

  renderCompareButtons(startDate, endDate) {
    const numDays = this.state.endDate
      ? this.state.endDate.diff(this.state.startDate, 'd') + 1
      : 0;

    const prevComparisonStartDate = this.state.startDate.subtract(numDays, 'd');
    const prevComparisonEndDate = this.state.startDate.subtract(1, 'd');
    const isPreviousPeriod =
      startDate &&
      endDate &&
      startDate.isSame(prevComparisonStartDate) &&
      endDate.isSame(prevComparisonEndDate);

    return (
      <div className={styles.rangePickerButtons}>
        <Button
          onClick={() => {
            this.setState({
              comparisonStartDate: this.state.startDate.subtract(
                numDays,
                'days'
              ),
              comparisonEndDate: this.state.startDate.subtract(1, 'days'),
            });
          }}
          className={`${styles.rangePickerButton} ${
            isPreviousPeriod ? styles.compare : ''
          }`}
          primary={isPreviousPeriod}
        >
          Previous Period
        </Button>
        <Button
          onClick={() => {
            this.setState({
              comparisonStartDate: null,
              comparisonEndDate: null,
              selectingKey: 'comparisonStartDate',
            });
          }}
          className={`${styles.rangePickerButton} ${styles.comparison}`}
          primary={!isPreviousPeriod}
        >
          Custom
        </Button>
      </div>
    );
  }

  renderCalendar(date) {
    return (
      <div className={styles.rangePickerCalendar}>
        {this.renderHeader(date)}
        {this.renderLabels(date)}
        {this.renderGrid(date)}
      </div>
    );
  }

  renderHeader(date) {
    const month = date.format('MMMM');
    const year = date.format('YYYY');
    return (
      <div className={styles.rangePickerCalendarHeader}>
        <div className={styles.rangePickerCalendarHeaderMonth}>
          {month} <strong>{year}</strong>
        </div>
      </div>
    );
  }

  renderLabels() {
    return (
      <div className={styles.rangePickerCalendarLabels}>
        {new Array(7).fill(0).map((_, i) => (
          <div className={styles.rangePickerCalendarLabel}>{LABELS[i]}</div>
        ))}
      </div>
    );
  }

  /**
   * Renders the 6 * 7 grid
   */
  renderGrid(date) {
    return (
      <div className={styles.rangePickerCalendarGrid}>
        {new Array(6).fill(0).map((_, i) => (
          <div className={styles.rangePickerCalendarGridRow}>
            {this.renderGridRow(i, date)}
          </div>
        ))}
      </div>
    );
  }

  /**
   * Renders each Row
   */
  renderGridRow(rowIndex, date) {
    return new Array(7).fill(0).map((_, columnIndex) => {
      const { text, disabled, day, invisible } = this._getTextForCell(
        date,
        rowIndex,
        columnIndex
      );
      const {
        startDate,
        endDate,
        comparisonStartDate,
        comparisonEndDate,
      } = this.state;
      const isSelectedClassName =
        this._isSelected(day, startDate, endDate) && !invisible
          ? styles.selected
          : '';
      const isComparisonSelectedClassName =
        this._isSelected(day, comparisonStartDate, comparisonEndDate) &&
        !invisible
          ? styles.comparisonSelected
          : '';
      const disabledClassName = disabled ? styles.disabled : '';
      const invisibleClassName = invisible ? styles.invisible : '';
      const hasLeftEdgeBorder =
        day.isSame(startDate, 'd') || day.isSame(comparisonStartDate, 'd');
      const hasRightEdgeBorder =
        day.isSame(endDate, 'd') || day.isSame(comparisonEndDate, 'd');
      return (
        <div
          onClick={() => this._handleCellClick(day)}
          style={{
            borderLeftWidth: hasLeftEdgeBorder ? 1 : 0,
            borderRightWidth: hasRightEdgeBorder ? 1 : 0,
          }}
          className={`${styles.rangePickerCalendarGridRowItem} ${disabledClassName} ${invisibleClassName} ${isSelectedClassName} ${isComparisonSelectedClassName}`}
        >
          <div className={styles.rangePickerCalendarGridRowItemText}>
            {text}
          </div>
        </div>
      );
    });
  }

  /**
   * On clicking the cell we want to start/end the range selection depending on the
   * current state
   * So if the current selection is startDate, we start endDate selection and so on
   * We use this.state.selectingKey to track this
   */
  _handleCellClick = day => {
    if (this.state.selectingKey === 'startDate') {
      this.setState({
        isSelecting: true,
        selectingKey: 'endDate',
        endDate: null,
      });
    } else if (this.state.selectingKey === 'comparisonStartDate') {
      const { startDate, endDate } = this.state;
      const numDays = endDate.diff(startDate, 'd');
      this.setState({
        isSelecting: true,
        selectingKey: 'comparisonStartDate',
        comparisonEndDate: day.add(numDays, 'd'),
      });
    } else {
      this.setState({ isSelecting: false, selectingKey: 'startDate' });
    }

    this.setState({ [this.state.selectingKey]: day });
  };

  /**
   * Translates the row/column index for an actual date (we only use the month from date)
   * @Returns
   * text : <string> : the date text (ex. 23)
   * invisible : <bool> : whether the given cell is invisible (out of range)
   * disabled : <bool> : whether the given cell is disabled (not selectable)
   * day: <dayjs> : the dayjs object representing the day of the cell
   */
  _getTextForCell = (date, rowIndex, columnIndex) => {
    const month = date.startOf('month');
    const cellNumber = rowIndex * 7 + columnIndex;
    const offset = month.day();
    const day = month.add(cellNumber - offset, 'd');
    const invisible = day.month() !== month.month();
    const disabled =
      (this.state.isSelecting &&
        this.state.selectingKey === 'endDate' &&
        day.isBefore(this.state.startDate)) ||
      (this.state.isSelecting &&
        this.state.selectingKey === 'comparisonEndDate' &&
        day.isBefore(this.state.comparisonStartDate));

    return { text: `${day.date()}`, disabled, day, invisible };
  };

  /**
   * For every cell we run this function to see if the range is selected or not
   * so given, the date and the start date and end date we see if it falls inside (inclusively)
   */
  _isSelected = (date, startDate, endDate) => {
    return (
      (date.isAfter(startDate, 'd') && date.isBefore(endDate, 'd')) ||
      date.isSame(startDate, 'd') ||
      date.isSame(endDate, 'd')
    );
  };

  /**
   * Retrieves some stats for the given start and end date
   * such as if the combination of dates matches any of the helper buttons
   * (Today, Yesterday, Last 7 days etc.)
   */
  _getDateStats = (startDate, endDate) => {
    const today = dayjs();
    const yesterday = dayjs().subtract(1, 'd');
    const isSame = startDate.isSame(endDate, 'd');
    const isToday = isSame && startDate.isSame(today, 'd');
    const isYesterday = isSame && startDate.isSame(yesterday, 'd');
    const isLast7Days =
      startDate.subtract(7, 'd').isSame(endDate, 'd') &&
      startDate.isSame(today, 'd');
    const isLast30Days =
      startDate.subtract(30, 'd').isSame(endDate, 'd') &&
      startDate.isSame(today, 'd');

    return {
      isToday,
      isYesterday,
      isLast7Days,
      isLast30Days,
    };
  };

  /**
   * This is for navigating different months
   * Goes back 1 month
   * (When the previous arrow icon is clicked)
   */
  _decreaseFocusedDate = () => {
    this.setState({ focusedDate: this.state.focusedDate.subtract(1, 'month') });
  };

  /**
   * This is for navigating different months
   * Goes ahead 1 month
   * (When the previous arrow icon is clicked)
   */
  _increaseFocusedDate = () => {
    this.setState({ focusedDate: this.state.focusedDate.add(1, 'month') });
  };

  /**
   * Sets the startDate and endDate
   * Also resets the month in focus to default
   */
  _setDates = (startDate, endDate) => {
    this.setState({
      startDate,
      endDate,
      isSelecting: false,
      selectingKey: 'startDate',
      focusedDate: dayjs(),
    });
  };
}

RangePicker.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.shape({
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    comparisonStartDate: PropTypes.object,
    comparisonEndDate: PropTypes.object,
  }),
};

RangePicker.defaultProps = {
  onChange: () => {},
  value: {
    startDate: dayjs(),
    endDate: dayjs(),
    comparisonStartDate: null,
    comparisonEndDate: null,
  },
};
