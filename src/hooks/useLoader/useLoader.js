import React, { useState, useEffect } from 'react';
import useActivify from '../useActivify';
import SpinningLoader from '../../components/Loader';
import styles from './useLoader.scss';

export default function useLoader(isLoading) {
  const [active, setActive] = useState(isLoading);
  const { visible, enabled } = useActivify(active);

  const activateLoader = () => {
    setActive(true);
  };

  const deactivateLoader = () => {
    setActive(false);
  };

  const renderLoader = React.useCallback(() => {
    const activeClassName = visible ? styles.active : 'yolo';
    if (!enabled) return null;
    return (
      <div className={`${styles.loadingWrapper} ${activeClassName}`}>
        <SpinningLoader />
      </div>
    );
  }, [visible, enabled]);

  useEffect(() => {
    if (isLoading) activateLoader();
    else deactivateLoader();
  }, [isLoading]);

  return { renderLoader, activateLoader, deactivateLoader };
}
