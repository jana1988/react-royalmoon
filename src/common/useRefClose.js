import { useEffect, useRef } from "react";
import { findDOMNode } from "react-dom";

const useRefClose = (props) => {
  const containerRef = useRef(null);
  const { visible = false, children = null, callBack = null } = props;

  useEffect(() => {
    const handler = (e) => {
      if (!findDOMNode(containerRef.current).contains(e.target)) {
        callBack(false);
      }
    };
    if (visible) window.addEventListener("click", handler, true);

    return () => {
      window.removeEventListener("click", handler);
    };
  }, [visible]);
  return <div ref={containerRef}>{children}</div>;
};

export default useRefClose;
