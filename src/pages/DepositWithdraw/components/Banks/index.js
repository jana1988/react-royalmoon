import styles from "./index.less";
import { bankImgs, isPendingBankImgs, coming_soon } from "../../constant";
import { Img } from "@/components/Ui";
import { useIntl } from "react-intl";

export default (props) => {
  const intl = useIntl();

  const { banks = [], selectedBank = {}, onClick = () => {} } = props;
  return (
    <div className={styles.banks}>
      {banks.map((item) => (
        <div
          className={`${styles.bank} ${
            item.id === selectedBank?.id ? styles.active : ""
          } ${bankImgs[item.id] ? "" : styles._default}`}
          key={item.id}
          title={item.name}
          onClick={() => onClick(item)}>
          <Img
            src={bankImgs[item.id] ? bankImgs[item.id] : bankImgs["_default"]}
          />
        </div>
      ))}
      {isPendingBankImgs.map((item, index) => (
        <div className={`${styles.bank} ${styles.pengdingbank}`} key={index}>
          <div className={styles.bg}></div>
          <Img src={item.img} />
          <div className={styles.tip}>
            <Img src={coming_soon[intl.locale]} className={styles.tip_img} />
          </div>
        </div>
      ))}
    </div>
  );
};
