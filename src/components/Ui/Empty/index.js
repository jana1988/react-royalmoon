import styles from "./index.less";

import empty from "@/assets/common/empty.webp";
import { Img } from "@/components/Ui";
import { useIntl } from "react-intl";
const Index = (props) => {
  const intl = useIntl();
  const {
    className = "",
    text = intl.$t({ id: "NO_TRANSACTIONS_DURING_THIS_PERIOD" }),
  } = props;
  return (
    <div className={`${styles.empty} ${className}`}>
      <div className={styles.content}>
        <Img src={empty} />
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default Index;
