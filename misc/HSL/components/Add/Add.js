import React from 'react';
import PropTypes from 'prop-types';

import './Add.scss';

function Add({ children }) {
  return <div>{children}</div>;
}

Add.propTypes = {
  children: PropTypes.node.isRequired,
};

Add.defaultProps = {};

export default Add;
