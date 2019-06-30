import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import Icon from 'components/UI/Icon';
import styles from './DatePicker.scss';

const LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

dayjs.extend(customParseFormat);

/**
 * Translates the row/column index for an actual date (we only use the month from date)
 * @Returns
 * text : <string> : the date text (ex. 23)
 * invisible : <bool> : whether the given cell is invisible (out of range)
 * day: <dayjs> : the dayjs object representing the day of the cell
 */
const getTextForCell = (date, rowIndex, columnIndex) => {
  const month = date.startOf('month');
  const cellNumber = rowIndex * 7 + columnIndex;
  const offset = month.day();
  const day = month.add(cellNumber - offset, 'd');
  const invisible = day.month() !== month.month();

  return {
    text: `${day.date()}`,
    day,
    invisible,
  };
};

/**
 * For every cell we run this function to see if the range is selected or not
 * so given, the date and the start date and end date we see if it falls inside (inclusively)
 */
const isSelected = (date, from, to) => {
  return (date.isAfter(from, 'd') && date.isBefore(to, 'd')) || date.isSame(from, 'd') || date.isSame(to, 'd');
};

const renderHeader = (date) => {
  const month = date.format('MMMM');
  const year = date.format('YYYY');
  return (
    <div className={styles.calendarHeader}>
      <div className={styles.calendarHeaderMonth}>
        {month}
        {' '}
        <strong>{year}</strong>
      </div>
    </div>
  );
};

const renderLabels = () => {
  return (
    <div className={styles.calendarLabels}>
      {new Array(7).fill(0).map((_, i) => (
        <div className={styles.calendarLabel}>{LABELS[i]}</div>
      ))}
    </div>
  );
};

/**
 * Renders each Row
 */
const renderGridRow = (rowIndex, date, ranges, handleCellClick) => {
  return new Array(7).fill(0).map((_, columnIndex) => {
    const { text, day, invisible } = getTextForCell(date, rowIndex, columnIndex);

    let isSelectedClassName = '';
    let hasLeftEdgeBorder = false;
    let hasRightEdgeBorder = false;
    let hasBottomEdgeBorder = false;
    ranges.forEach(({ from, to, color }) => {
      if (invisible) return;
      if (day.add(7, 'd').isSame(from, 'd')) hasBottomEdgeBorder = true;
      if (day.add(7, 'd').isSame(to, 'd')) hasBottomEdgeBorder = true;
      if (day.isSame(from, 'd')) hasLeftEdgeBorder = true;
      if (day.isSame(to, 'd')) hasRightEdgeBorder = true;
      if (isSelected(day, from, to)) isSelectedClassName = styles.selected;
    });

    // const disabledClassName = disabled ? styles.disabled : '';
    const invisibleClassName = invisible ? styles.invisible : '';

    return (
      <div
        onClick={() => handleCellClick(day)}
        style={{
          borderLeftWidth: hasLeftEdgeBorder ? 1 : 0,
          borderRightWidth: hasRightEdgeBorder ? 1 : 0,
          borderBottomColor: hasBottomEdgeBorder ? '#1b9cfc' : undefined,
        }}
        className={`${styles.calendarGridRowItem} ${isSelectedClassName} ${invisibleClassName}`}
        // } ${disabledClassName}`}
      >
        <div className={styles.calendarGridRowItemText}>{text}</div>
      </div>
    );
  });
};

/**
 * Renders the 6 * 7 grid
 */
const renderGrid = (date, ranges, handleCellClick) => {
  return (
    <div className={styles.calendarGrid}>
      {new Array(6).fill(0).map((_, i) => (
        <div className={styles.calendarGridRow}>{renderGridRow(i, date, ranges, handleCellClick)}</div>
      ))}
    </div>
  );
};

const renderCalendar = (date, ranges, handleCellClick) => {
  return (
    <div className={styles.calendar}>
      {renderHeader(date)}
      {renderLabels(date)}
      {renderGrid(date, ranges, handleCellClick)}
    </div>
  );
};

const DatePicker = ({
  value,
  numMonths,
  onChange
}) => {
  const ranges = Array.isArray(value) ? value : [{ from: value, to: value }];
  const [viewingMonth, setViewingMonth] = React.useState(dayjs());

  const viewNextMonth = React.useCallback(() => {
    setViewingMonth(viewingMonth.add(1, 'month'));
  });

  const viewPreviousMonth = React.useCallback(() => {
    setViewingMonth(viewingMonth.subtract(1, 'month'));
  });

  const handleCellClick = React.useCallback((day) => {
    onChange(day);
  });

  return (
    <div className={styles.datePicker}>
      <Icon src="angle-down" className={styles.datePickerNavigationIcon} onClick={viewPreviousMonth} />
      <Icon src="angle-down" className={`${styles.datePickerNavigationIcon} ${styles.right}`} onClick={viewNextMonth} />
      {new Array(numMonths)
        .fill(0)
        .map((_, i) => renderCalendar(viewingMonth.subtract(numMonths - i - 1, 'months'), ranges, handleCellClick))}
    </div>
  );
};

DatePicker.propTypes = {
  onChange: PropTypes.func,
  numMonths: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        from: PropTypes.object,
        to: PropTypes.object,
        color: PropTypes.string,
      })
    ),
    PropTypes.object,
  ]),
};

DatePicker.defaultProps = {
  onChange: () => {},
  numMonths: 2,
  // value: dayjs(),
  value: [{ from: dayjs(), to: dayjs() }, { from: dayjs().subtract(10, 'd'), to: dayjs().subtract(4, 'd') }]
};

export default DatePicker;