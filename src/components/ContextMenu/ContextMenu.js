import React from 'react';
import PropTypes from 'prop-types';

import ContextMenuPortal from './components/ContextMenuPortal';
import ContextMenuItem from './components/ContextMenuItem';
import ContextMenuButton from './components/ContextMenuButton';
import ContextMenuIcon from './components/ContextMenuIcon';

const ContextMenu = (props) => {
  return <ContextMenuPortal {...props} />;
};

ContextMenu.Item = ContextMenuItem;
ContextMenu.Button = ContextMenuButton;
ContextMenu.Icon = ContextMenuIcon;

ContextMenu.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  attachTo: PropTypes.object,
  maxHeight: PropTypes.number,
  onOverlayClick: PropTypes.func,
  offset: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
  }),
};

ContextMenu.defaultProps = {
  offset: {
    left: 0,
    top: 0,
  },
  onOverlayClick: () => {},
};

export default ContextMenu;
