import styles from "./index.less";
import Loading from "@/assets/ui/Loading/loading_icon@2x.webp";
import { createPortal } from "react-dom";
import { Img } from "@/components/Ui";
import { isMobile } from "@/utils";
import useScrollPenetrate from "@/common/useScrollPenetrate";
import { useEffect } from "react";
import { useIntl } from "react-intl";
const Index = () => {
  const intl = useIntl();
  const [modalVisible, modalHide] = useScrollPenetrate();

  useEffect(() => {
    modalVisible();
    return () => {
      modalHide();
    };
  }, []);

  const pc = () => (
    <div className={styles.loading}>
      <div className={styles.wrap}>
        <div className={styles.img}>
          <Img src={Loading} />
        </div>
        <div className={styles.text}>{intl.$t({ id: "LOADING" })}</div>
      </div>
    </div>
  );
  const mb = () =>
    createPortal(
      <div className={styles.mask}>
        <div className={styles.loading}>
          <div className={styles.wrap}>
            <div className={styles.img}>
              <Img src={Loading} />
            </div>
            <div className={styles.text}>{intl.$t({ id: "LOADING" })}</div>
          </div>
        </div>
      </div>,
      document.body,
    );
  return isMobile() ? mb() : pc();
};

export default Index;
