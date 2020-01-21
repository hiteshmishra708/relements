import { useState, useEffect, useRef } from "react";

/**
 * useActivify React Hook
 * Enables/Disables elements with timeouts to allow animations to
 * take place
 * @param {bool} active whether to enable to disable the element
 * @returns {obj} {
 *    @param visible {bool}  whether the element should be showed (animated in/out)
 *    @param enabled {bool}  whether the element should render (return null if false)
 * }
 */
export default function useActivify(active) {
  const [visible, setVisible] = useState(active);
  const [enabled, setEnabled] = useState(active);

  const _enableTimeout = useRef(null);
  const _disableTimeout = useRef(null);

  const show = () => {
    if (_disableTimeout.current) clearTimeout(_disableTimeout.current);
    setEnabled(true);
    _enableTimeout.current = setTimeout(() => {
      setVisible(true);
    }, 50);
  };

  const hide = () => {
    if (_enableTimeout.current) clearTimeout(_enableTimeout.current);
    setVisible(false);
    _disableTimeout.current = setTimeout(() => {
      setEnabled(false);
    }, 400);
  };

  useEffect(() => {
    if (active) show();
    else hide();
  }, [active]);

  return { visible, enabled };
}
