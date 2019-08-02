import React from 'react';
import PropTypes from 'prop-types';

import './Case.scss';

function Case({ children }) {
  return <div>{children}</div>;
}

Case.propTypes = {
  children: PropTypes.node.isRequired,
};

Case.defaultProps = {};

export default Case;
