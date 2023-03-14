import { useEffect } from "react";

const usePageShow = (callback, params, isHidden, yi) => {
  useEffect(() => {
    let hidden = "hidden";
    let visibilitychange = "visibilitychange";
    if (typeof document.hidden !== "undefined") {
      hidden = "hidden";
      visibilitychange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
      hidden = "mozHidden";
      visibilitychange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilitychange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilitychange = "webkitvisibilitychange";
    }
    const handler = (e) => {
      if (document[hidden]) {
        isHidden && callback(params);
      } else {
        !isHidden && callback(params);
      }
    };
    document.addEventListener(visibilitychange, handler);
    callback(params);
    return () => {
      document.removeEventListener("visibilitychange", handler);
    };
  }, [yi]);
};
export default usePageShow;
