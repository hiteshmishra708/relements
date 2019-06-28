import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import AngleDownIcon from 'icons/angle-down.svg';
import styles from './Pagination.scss';

const renderDots = () => (
  <div className={`${styles.paginationSeparator}`}>
    <div className={`${styles.paginationDot}`} />
    <div className={`${styles.paginationDot}`} />
    <div className={`${styles.paginationDot}`} />
  </div>
);

const Pagination = ({
  className, numPages, page, onChange,
}) => {
  const NUM_PAGES = numPages || 1;
  const PAGE = page - 1;
  const leftDisabled = PAGE === 0 ? styles.disabled : '';
  const rightDisabled = PAGE === NUM_PAGES - 1 ? styles.disabled : '';

  const visiblePages = Array(NUM_PAGES)
    .fill(0)
    .map((page, i) => {
      if (i === NUM_PAGES - 1) return 1;
      return Math.abs(PAGE - i) < 6 ? 1 : 0;
    });

  const renderArrow = React.useCallback((className, newPage) => {
    return (
      <div onClick={() => onChange(newPage)} className={`${styles.paginationArrow} ${className}`}>
        <Icon src={AngleDownIcon} />
      </div>
    );
  });

  return (
    <div className={`${styles.pagination} ${className}`}>
      {renderArrow(`${styles.left} ${leftDisabled}`, page - 1)}
      {visiblePages.map((page, i) => {
        const paginationButtonActive = PAGE === i ? styles.active : '';
        if (page === 0 && visiblePages[i - 1] !== 0) return renderDots();
        if (page === 0) return null;
        return (
          <div onClick={() => onChange(i + 1)} className={`${styles.paginationButton} ${paginationButtonActive}`}>
            {i + 1}
          </div>
        );
      })}
      {renderArrow(`${styles.right} ${rightDisabled}`, page + 1)}
    </div>
  );
};

Pagination.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  numPages: PropTypes.number,
  page: PropTypes.number,
};

export default Pagination;
