import { createPortal } from "react-dom";
import useScrollPenetrate from "@/common/useScrollPenetrate";
import { Close } from "../Icon";
import styles from "./index.less";
import { Button } from "..";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";

const Index = (props) => {
  const [modalVisible, modalHide] = useScrollPenetrate();

  const {
    children,
    visible = false,
    title = "",
    onCancel = null,
    onOk = null,
    form = "",
    showFooter = true,
    footerName = <FormattedMessage id="MODAL_CONFIRM" />,
    footer = (
      <Button onClick={onOk} form={form} className={styles.button}>
        {footerName}
      </Button>
    ),
    zIndex = 99,
  } = props;

  useEffect(() => {
    if (visible) {
      modalVisible();
    } else {
      modalHide();
    }
  }, [visible]);

  return (
    visible &&
    createPortal(
      <div className={styles.modal} style={{ zIndex }}>
        <div className={styles.dialog}>
          <div className={styles.header}>
            <div className={styles.title}>{title}</div>
            {onCancel && (
              <div className={styles.img} onClick={onCancel}>
                <Close />
              </div>
            )}
          </div>
          <div className={styles.body}>{children}</div>
          {showFooter && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>,
      document.body,
    )
  );
};

export default Index;
