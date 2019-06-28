import React from 'react';
import Table from '@src/src/components/Table';
import styles from './ClassNamesBlock.scss';

const TABLE = {
  columns: [
    {
      title: 'Name',
      width: '15%',
    },
    {
      title: 'Description',
    },
  ],
};

const ClassNamesBlock = ({ of }) => {
  const classNames = of.classNames;
  const generateColumn = content => ({ content });
  const rows = Object.keys(classNames).map((key) => {
    return [generateColumn(key), generateColumn(classNames[key])];
  });

  return (
    <Table
      prefixClassName={styles.classNamesBlock}
      sortable
      sortKey="title"
      sortOrder={-1}
      columns={TABLE.columns}
      rows={rows}
    />
  );
};

export default ClassNamesBlock;
