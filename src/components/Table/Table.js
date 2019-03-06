import React from 'react';
import PropTypes from 'prop-types';
// import Icon from 'components/Icon';

import styles from './Table.scss';

export default class Table extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    headerClassName: PropTypes.string,
    bodyClassName: PropTypes.string,
    onNavigate: PropTypes.func,
    onMenuItemClick: PropTypes.func,
    onSort: PropTypes.func,
    onRowClick: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
    columns: PropTypes.arrayOf(PropTypes.object),
    simple: PropTypes.bool,
    selected: PropTypes.number,
    noHeader: PropTypes.bool,
  };

  static defaultProps = {
    onNavigate: cb => cb(),
    onRowClick: () => {},
    onMenuItemClick: () => {},
  };

  /**
   * Renders the horizontal menu
   * @return {[type]} [description]
   */
  render() {
    const simpleClassName = this.props.simple ? styles.simple : '';
    const { itemClassName, noHeader } = this.props;

    return (
      <div className={`${styles.table} ${simpleClassName} ${this.props.className || ''}`}>
        {noHeader ? null : (
          <div className={`${styles.tableHeader} ${this.props.headerClassName}`}>
            {this.props.columns.map((column, i) => {
              const isTheSortedColumn = this.props.sortKey === column.sortKey;
              const activeClassName = this.props.sortable && (isTheSortedColumn ? styles.active : '');
              const sortIcon = this.props.sortable && isTheSortedColumn && (this.props.sortOrder === 1 ? '▲' : '▼');
              return (
                <div
                  key={i}
                  className={`${styles.tableHeaderItem} ${simpleClassName} ${activeClassName} ${column.className}`}
                  style={{ width: column.width, maxWidth: column.width, minWidth: column.width }}
                  onClick={e => this.props.onSort(column)}
                >
                  <div className={styles.tableHeaderItemText}>
                    {' '}
                    {column.title}
                    {' '}
                  </div>
                  <div className={styles.tableHeaderItemIcon}>
                    {' '}
                    {sortIcon}
                    {' '}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className={`${styles.tableBody} ${this.props.bodyClassName}`}>
          {this.props.data.map((row, i) => {
            if (row.hidden) return null;
            const columns = Array.isArray(row) ? row : row.columns;
            const disabledClassName = row.disabled ? styles.disabled : '';
            const selectedClassName = i === this.props.selected ? styles.selected : '';
            return (
              <div
                key={`${i}-${row.id}`}
                className={`${styles.tableRow} ${selectedClassName} ${disabledClassName} ${
                  row.className ? row.className : ''
                }`}
                onClick={e => this.props.onRowClick(i, row)}
              >
                {columns.map((column, i) => {
                  return (
                    <div
                      key={i}
                      className={`${styles.tableRowItem} ${simpleClassName} ${itemClassName}`}
                      style={{
                        width: this.props.columns[i].width,
                        maxWidth: this.props.columns[i].width,
                        minWidth: this.props.columns[i].width,
                      }}
                    >
                      <div className={styles.tableRowItemText}>
                        {' '}
                        {column.content}
                        {' '}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
