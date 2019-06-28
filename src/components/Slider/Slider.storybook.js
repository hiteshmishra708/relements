import React from 'react';
import { storiesOf } from '@storybook/react';

import Docs from './Slider.mdx';
import styles from './Slider.scss';

storiesOf('UI/Slider', module).add('Documentation', () => <Docs />);

export const Card = ({ active }) => {
  return <div className={`${styles.card} ${active ? styles.active : ''}`} />;
};
