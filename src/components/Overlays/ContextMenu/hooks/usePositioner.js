import React from 'react';

export default function usePositioner(attachTo, contextMenuDOM, offset) {
  const [position, setPosition] = React.useState({});
  React.useEffect(() => {
    if (!attachTo || !contextMenuDOM.current) return;
    const rect = attachTo.current ? attachTo.current.getBoundingClientRect() : attachTo.getBoundingClientRect();
    const contextMenuRect = contextMenuDOM.current.getBoundingClientRect();
    const position = {
      top: rect.top + offset.top,
      left: offset.xMode === 'LEFT' ? rect.left + offset.left : rect.right + offset.left,
    };

    let diff = window.innerWidth - (rect.right + contextMenuRect.width);
    if (diff < 0) {
      position.left += diff;
    } else {
      diff = 0;
    }

    setPosition(position);
  }, [contextMenuDOM.current]);

  return position;
}
