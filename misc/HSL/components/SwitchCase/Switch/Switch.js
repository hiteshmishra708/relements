import React from 'react';
import PropTypes from 'prop-types';

import './Switch.scss';

function Switch({ children }) {
  return <div>{children}</div>;
}

Switch.propTypes = {
  children: PropTypes.node.isRequired,
};

Switch.defaultProps = {};

export default Switch;
