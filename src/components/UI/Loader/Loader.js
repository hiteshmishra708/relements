import React from 'react';
import PropTypes from 'prop-types';

import styles from './Loader.scss';

const Loader = ({ size }) => {
  return (
    <div className={styles.loader}>
      <span className={styles.loaderInner} />
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.number,
};

Loader.defaultProps = {
  size: 40,
};

export default Loader;
