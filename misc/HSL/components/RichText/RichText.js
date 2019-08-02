import React from 'react';
import PropTypes from 'prop-types';

import './RichText.scss';

function RichText({ children }) {
  return <div>{children}</div>;
}

RichText.propTypes = {
  children: PropTypes.node.isRequired,
};

RichText.defaultProps = {};

export default RichText;
