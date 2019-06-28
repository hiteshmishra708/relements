import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageProgressBar.scss';

const ImageProgressBar = ({ complete, active }) => (
  <div className={`${styles.progressBar} ${active ? styles.active : ''}`}>
    <div className={styles.progressBarInner} style={{ width: `${complete}%` }} />
  </div>
);

ImageProgressBar.propTypes = {
  complete: PropTypes.number,
  active: PropTypes.bool,
};

export default ImageProgressBar;
