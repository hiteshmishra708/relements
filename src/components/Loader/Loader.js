import React from 'react';

import styles from './Loader.scss';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <span className={styles.loaderInner} />
    </div>
  );
};

export default Loader;
