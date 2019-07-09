import React from 'react';
import dayjs from 'dayjs';

import Button from 'components/UI/Button';
import Input from '../Input';
import styles from './Inputs.scss';

/**
 * Retrieves some stats for the given start and end date
 * such as if the combination of dates matches any of the helper buttons
 * (Today, Yesterday, Last 7 days etc.)
 */
function getDateStats(startDate, endDate) {
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

function Shortcuts({ startDate, endDate, onChange }) {
  const {
    isToday,
    isYesterday,
    isLast7Days,
    isLast30Days,
  } = getDateStats(startDate, endDate);

  const today = dayjs();
  return (
    <div className={styles.inputsButtons}>
      <Button
        primary={isToday}
        className={styles.inputsButton}
        onClick={() => onChange(today, today)}
      >
        Today
      </Button>
      <Button
        primary={isYesterday}
        className={styles.inputsButton}
        onClick={() =>
          onChange(today.subtract(1, 'd'), today.subtract(1, 'd'))
        }
      >
        Yesterday
      </Button>
      <Button
        primary={isLast7Days}
        className={styles.inputsButton}
        onClick={() => onChange(today.subtract(6, 'd'), today)}
      >
        Last 7 Days
      </Button>
      <Button
        primary={isLast30Days}
        className={styles.inputsButton}
        onClick={() => onChange(today.subtract(29, 'd'), today)}
      >
        Last 30 Days
      </Button>
    </div>
  );
}

function Inputs({ startDate, endDate, onChange, onFocus, selectingKey }) {
  return (
    <div className={styles.inputsColumn}>
      <div className={styles.inputsColumnLabel}>Select Date</div>
      <div className={styles.inputsColumnHint}>
        Tap on the calendar to define custom date ranges
      </div>
      <Shortcuts startDate={startDate} endDate={endDate} onChange={onChange}/>
      <div className={styles.inputsItems}>
        <Input
          label='Start'
          key='startDate'
          value={startDate}
          onFocus={() => onFocus('startDate')}
          focused={selectingKey === 'startDate'}
        />
        <Input
          className={styles.endInput}
          label='End'
          key='endDate'
          value={endDate}
          onFocus={() => onFocus('endDate')}
          focused={selectingKey === 'endDate'}
        />
      </div>
    </div>
  )
}

export default Inputs
