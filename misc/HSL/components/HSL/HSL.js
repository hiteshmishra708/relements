import React from 'react';
import PropTypes from 'prop-types';

import './HSL.scss';

function HSL({ children }) {
  return <div>{children}</div>;
}

HSL.propTypes = {
  children: PropTypes.node.isRequired,
};

HSL.defaultProps = {};

export default HSL;
