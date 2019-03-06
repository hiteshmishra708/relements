import React from 'react';
import expect from 'expect';
import { configure, addDecorator } from '@storybook/react';
import { describe, it } from 'storybook-addon-specifications';
import styles from './config.scss';
import './__conf__/enzymeConfig';
// import './__conf__/jestMockConfig';

addDecorator(story => <div className={styles.storybook}>{story()}</div>);

const req = require.context('../src', true, /\.storybook\.js$/);
configure(loadStories, module);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

window.describe = describe;
window.it = it;
window.expect = expect;
