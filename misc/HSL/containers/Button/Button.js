import React from 'react';
import PropTypes from 'prop-types';

import HSL from '../../components/HSL';
import Preview from './components/Preview';
import Builder from './components/Builder';

import './Button.scss';

function Button() {
  return (
    <>
      <HSL>
        <Preview />
        <Builder />
      </HSL>
    </>
  );
}

Button.propTypes = {};
Button.defaultProps = {};

export default Button;
