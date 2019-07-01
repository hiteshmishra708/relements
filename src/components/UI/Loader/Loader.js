import React from 'react';
import PropTypes from 'prop-types';

import styles from './Loader.scss';

const Loader = ({ size, className }) => {
  return (
    <div data-testid="loader" className={`${styles.loader} ${className}`}>
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
