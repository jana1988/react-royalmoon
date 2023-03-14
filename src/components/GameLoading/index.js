import styles from "./index.less";
import Loading from "@/assets/ui/Loading/game_loading.webp";
import { createPortal } from "react-dom";
import { Img } from "@/components/Ui";
import useScrollPenetrate from "@/common/useScrollPenetrate";
import { useEffect } from "react";

const Index = () => {
  const [modalVisible, modalHide] = useScrollPenetrate();

  useEffect(() => {
    modalVisible();
    return () => {
      modalHide();
    };
  }, []);

  return createPortal(
    <div className={styles.mask}>
      <div className={styles.loading}>
        <div className={styles.img}>
          <Img src={Loading} />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Index;
