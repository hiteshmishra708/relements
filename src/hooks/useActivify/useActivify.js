import { useState, useEffect } from 'react';

export default function useActivify(active) {
  const [visible, setVisible] = useState(active);
  const [enabled, setEnabled] = useState(active);

  let _enableTimeout = null;
  let _disableTimeout = null;

  const show = () => {
    if (_disableTimeout) clearTimeout(_disableTimeout);
    setEnabled(true);
    _enableTimeout = setTimeout(() => {
      setVisible(true);
    }, 50);
  };

  const hide = () => {
    if (_enableTimeout) clearTimeout(_enableTimeout);
    setVisible(false);
    _disableTimeout = setTimeout(() => {
      setEnabled(false);
    }, 400);
  };

  useEffect(() => {
    if (active) show();
    else hide();
  }, [active]);

  return { visible, enabled };
}
