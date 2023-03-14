import { createPortal } from "react-dom";
import { Close } from "@/components/Ui/Icon";

import styles from "./index.less";
import loginbanner from "@/assets/auth/loginbanner.webp";
// import logo from "@/assets/logo.webp";
import { useEffect } from "react";
import useScrollPenetrate from "@/common/useScrollPenetrate";
import { Img } from "@/components/Ui";
import { logo } from "@/assets";

const Index = (props) => {
  const { children, visible = false, title = "", onCancel, text = "" } = props;
  const [modalVisible, modalHide] = useScrollPenetrate();

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
      <div className={styles.modal}>
        <div className={styles.dialog}>
          <div className={styles.left}>
            <div className={styles.logo}>
              <Img src={logo} />
            </div>
            {/* <div className={styles.text}>Best Online Casino in</div> */}
            {/* <div className={styles.subTitle}>Japan</div> */}
            <div className={styles.bg}>
              <Img src={loginbanner} />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.header}>
              <div className={styles.title}>{title}</div>
              <div className={styles.img} onClick={onCancel}>
                <Close />
              </div>
            </div>
            <div className={styles.body}>{children}</div>
          </div>
        </div>
      </div>,
      document.body,
    )
  );
};

export default Index;
