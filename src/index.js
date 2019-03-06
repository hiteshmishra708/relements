import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

export * from './components';

export const render = (component, element, props) => {
  ReactDOM.render(React.createElement(component, props), document.getElementById(element));
};
