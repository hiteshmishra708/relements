import React from 'react';

import Button from 'components/UI/Button';
import Checkbox from 'components/Inputs/Checkbox';

import Input from '../Input';
import styles from './Comparison.scss';

function Shortcuts({ startDate, endDate, onChange }) {
  const numDays = endDate ? endDate.diff(startDate, 'd') + 1 : 0;
  const prevComparisonStartDate = startDate.subtract(numDays, 'd');
  const prevComparisonEndDate = startDate.subtract(1, 'd');
  const isPreviousPeriod =
    startDate &&
    endDate &&
    startDate.isSame(prevComparisonStartDate) &&
    endDate.isSame(prevComparisonEndDate);

  return (
    <div className={styles.inputsButtons}>
      <Button
        onClick={() => {
          onChange(
            startDate.subtract(numDays, 'days'),
            startDate.subtract(1, 'days'),
          );
        }}
        className={`${styles.inputsButton} ${isPreviousPeriod ? styles.compare : ''}`}
        primary={isPreviousPeriod}
      >
        Previous Period
      </Button>
      <Button
        onClick={() => {
          onChange(
            null,
            null,
            'comparisonStartDate',
          );
        }}
        className={`${styles.inputsButton} ${styles.comparison}`}
        primary={!isPreviousPeriod}
      >
        Custom
      </Button>
    </div>
  );
}

function Comparison({ comparisonStartDate, comparisonEndDate, onToggle, onChange, selectingKey, toggled, startDate, endDate }) {
  return (
    <div className={styles.inputs}>
      <Checkbox.Item
        label="Compare"
        value={toggled}
        className={styles.inputsCheckbox}
        onChange={onToggle}
      />
      {toggled ? (
        <React.Fragment>
          <Shortcuts startDate={startDate} endDate={endDate} onChange={onChange} />
          <div className={styles.inputsItems}>
            <Input
              label='Start'
              key='comparisonStartDate'
              value={comparisonStartDate}
              onFocus={() => onFocus('comparisonStartDate')}
              focused={selectingKey === 'comparisonStartDate'}
              compare
            />
            <Input
              className={styles.endInput}
              label='End'
              key='comparisonEndDate'
              value={comparisonEndDate}
              onFocus={() => onFocus('comparisonEndDate')}
              focused={selectingKey === 'comparisonEndDate'}
              compare
            />
          </div>
        </React.Fragment>
      ) : null}
    </div>
  )
}

export default Comparison
