import React from 'react';
import { storiesOf } from '@storybook/react';
import { BUTTON_TYPES, SIZES } from '../../constants';

import Button from './Button';

const TEXT = 'This is button';
storiesOf('Button Component', module)
  .add('Default', () => <Button>{TEXT}</Button>)
  .add('Type: Primary', () => <Button type={BUTTON_TYPES.PRIMARY}>{TEXT}</Button>)
  .add('Type: Secondary', () => <Button type={BUTTON_TYPES.SECONDARY}>{TEXT}</Button>)
  .add('Type: Outline', () => <Button type={BUTTON_TYPES.OUTLINE}>{TEXT}</Button>)
  .add('Type: Grey', () => <Button type={BUTTON_TYPES.GREY}>{TEXT}</Button>)
  .add('Type: Warning', () => <Button type={BUTTON_TYPES.WARNING}>{TEXT}</Button>)
  .add('Type: Yellow', () => <Button type={BUTTON_TYPES.YELLOW}>{TEXT}</Button>)
  .add('Size: Small', () => <Button size={SIZES.SMALL}>{TEXT}</Button>)
  .add('Size: Medium', () => <Button size={SIZES.MEDIUM}>{TEXT}</Button>)
  .add('Size: Big', () => <Button size={SIZES.BIG}>{TEXT}</Button>);
