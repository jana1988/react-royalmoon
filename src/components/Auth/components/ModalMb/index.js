import { createPortal } from "react-dom";
import { Close } from "@/components/Ui/Icon";
import logo_mobile from "@/assets/logo.webp";
import styles from "./index.less";
import { Img } from "@/components/Ui";
import { logo } from "@/assets";

const Index = (props) => {
  const { children, visible = false, title = "", onCancel, text = "" } = props;
  return (
    // visible &&
    createPortal(
      <div className={`${styles.modal} ${visible ? styles.active : ""}`}>
        <div className={styles.dialog}>
          <div className={styles.content}>
            <div className={styles.close} onClick={onCancel}>
              <Close />
            </div>
            <div className={styles.logo}>
              <Img src={logo} />
            </div>
            <div className={styles.text}>
              {/* Japan’s Top Online Casino Entertainment Platform */}
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.body}>{children}</div>
          </div>
        </div>
      </div>,
      document.body,
    )
  );
};

export default Index;
