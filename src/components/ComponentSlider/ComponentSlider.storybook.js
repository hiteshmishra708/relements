import React from 'react';
import { storiesOf } from '@storybook/react';

import styles from './ComponentSlider.scss';
import ComponentSlider from './ComponentSlider';

storiesOf('Slider', module)
  .add('Default', () => {
    const story = (
      <ComponentSlider onChange={console.log}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </ComponentSlider>
    );
    return story;
  })
  .add('Center Mode', () => {
    const story = (
      <ComponentSlider centerMode onChange={console.log}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </ComponentSlider>
    );
    return story;
  });

const Card = ({ active }) => {
  return <div className={`${styles.card} ${active ? styles.active : ''}`} />;
};
