import { addParameters, configure } from '@storybook/react';
import './config.scss';

// automatically import all files ending in *.storybook.js
const req = require.context('../src', true, /.storybook.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addParameters({
  options: {
    showPanel: false,
    isToolshown: false,
    isFullscreen: true,
    sidebarAnimations: false,
  },
});

configure(loadStories, module);
