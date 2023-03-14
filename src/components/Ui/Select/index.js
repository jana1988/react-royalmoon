import { useEffect, useRef, useState } from "react";
import { Button } from "..";
import styles from "./index.less";
import { SmallArrow } from "../Icon";

const Index = (props) => {
  const selectRef = useRef(null);
  let { text, children, className = "", buttonClassName = "" } = props;
  const [visible, setVisible] = useState(false);
  const toggle = () => setVisible(!visible);

  useEffect(() => {
    const handler = (e) => {
      if (!selectRef.current.contains(e.target)) setVisible(false);
    };
    if (visible) window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  }, [visible]);

  useEffect(() => {
    setVisible(false);
  }, [text]);

  return (
    <div ref={selectRef} className={`${styles.select} ${className}`}>
      <Button
        onClick={toggle}
        className={`${buttonClassName} ${styles.button}`}>
        {text}
        <div
          className={styles.icon}
          style={{ transform: `rotateX(${visible ? 180 : 0}deg)` }}>
          <SmallArrow />
        </div>
      </Button>
      {visible && (
        <div className={styles.main}>
          <div className={styles.triangle}></div>
          <div className={styles.content}>{children}</div>
        </div>
      )}
    </div>
  );
};

export default Index;
