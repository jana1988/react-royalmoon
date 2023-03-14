import { useState, useEffect, useMemo, useCallback } from "react";

const defaultConfig = {
  root: null,
  threshold: 0.2,
  rootMargin: "0px",
};

const useVisibilityHook = (options = {}, visible = false) => {
  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        {
          ...defaultConfig,
          ...options,
        },
      ),
    [options],
  );

  const [isVisible, setIsVisible] = useState(visible);
  const [element, setElement] = useState(null);

  const forceCheck = useCallback(() => {
    if (element) {
      observer.unobserve(element);
      observer.observe(element);
    }
  }, [element, observer]);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
    }
  }, [visible]);

  useEffect(() => {
    if (!element) {
      return;
    }
    observer.observe(element);
    return () => {
      if (observer?.disconnect) {
        observer.disconnect();
      }
    };
  }, [element, observer, options]);

  return { setElement, isVisible, forceCheck };
};

export default useVisibilityHook;
