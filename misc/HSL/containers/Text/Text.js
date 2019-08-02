import React from 'react';
import PropTypes from 'prop-types';

import HSL from '../../components/HSL';
import Preview from './components/Preview';
import Builder from './components/Builder';

import './Text.scss';

function Text() {
  return (
    <>
      <HSL>
        <Preview />
        <Builder />
      </HSL>
    </>
  );
}

Text.propTypes = {};
Text.defaultProps = {};

export default Text;
