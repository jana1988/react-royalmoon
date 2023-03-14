import styles from "./index.less";
import Loading from "@/assets/ui/Loading/cash_loading_web@2x.webp";
import { Img } from "@/components/Ui";

const Index = () => {
  return (
    <div className={styles.loading}>
      <Img src={Loading} className={styles.img} />
    </div>
  );
};

export default Index;
