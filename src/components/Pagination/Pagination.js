import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import AngleDownIcon from 'icons/angle-down.svg';
import styles from './Pagination.scss';

const Pagination = ({
  className, children, size, primary, secondary, numPages, page, onChange,
}) => {
  const NUM_PAGES = numPages || 1;
  const PAGE = page - 1;

  const primaryClassName = primary ? styles.primary : '';
  const secondaryClassName = secondary ? styles.secondary : '';
  const smallClassName = size === 'small' ? styles.small : '';

  const visiblePages = Array(NUM_PAGES)
    .fill(0)
    .map((page, i) => {
      if (i === NUM_PAGES - 1) return 1;
      return Math.abs(PAGE - i) < 6 ? 1 : 0;
    });

  return (
    <div className={styles.pagination}>
      <div
        onClick={e => onChange(page - 1)}
        className={`${styles.paginationArrow} ${styles.left} ${PAGE === 0 ? styles.disabled : ''}`}
      >
        <Icon src={{ default: AngleDownIcon }} />
      </div>
      {visiblePages.map((page, i) => {
        const paginationButtonActive = PAGE === i ? styles.active : '';
        if (page === 0 && visiblePages[i - 1] !== 0) {
          return (
            <div className={`${styles.paginationSeparator}`}>
              <div className={`${styles.paginationDot}`} />
              <div className={`${styles.paginationDot}`} />
              <div className={`${styles.paginationDot}`} />
            </div>
          );
        } else if (page === 0) return null;
        return (
          <div onClick={e => onChange(i + 1)} className={`${styles.paginationButton} ${paginationButtonActive}`}>
            {i + 1}
          </div>
        );
      })}
      <div
        onClick={e => onChange(page + 1)}
        className={`${styles.paginationArrow} ${styles.right} ${PAGE === NUM_PAGES - 1 ? styles.disabled : ''}`}
      >
        <Icon src={{ default: AngleDownIcon }} />
      </div>
    </div>
  );
};

Pagination.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  onChange: PropTypes.func,
  numPages: PropTypes.number,
  page: PropTypes.number,
};

export default Pagination;
