import styles from "./index.less";
import { createPortal } from "react-dom";
import { Close } from "../Icon";
import useScrollPenetrate from "@/common/useScrollPenetrate";
import { useEffect } from "react";

const Index = (props) => {
  const {
    title = "title",
    children = "",
    visible = false,
    onClose = null,
    footer = null,
  } = props;
  const [modalVisible, modalHide] = useScrollPenetrate();

  useEffect(() => {
    if (visible) {
      modalVisible();
    } else {
      modalHide();
    }
  }, [visible]);
  return (
    // visible &&
    createPortal(
      <div className={`${styles.popup} ${visible ? styles.active : ""}`}>
        <div className={styles.dialog}>
          <div className={styles.header}>
            <div className={styles.title}>{title}</div>
            <div
              className={styles.close}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
                document.documentElement.removeAttribute("style");
              }}>
              <Close />
            </div>
          </div>
          <div className={styles.body}>{children}</div>
          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>,
      document.body,
    )
  );
};

export default Index;
