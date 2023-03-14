import styles from "./index.less";
import no_ip from "@/assets/noip/ipblocktext@2x.png";

import { Img } from "@/components/Ui";

export default () => {
  return (
    <div className={styles.no_ip}>
      <div className={styles.wrap}>
        <div className={styles.img}>
          <Img src={no_ip} />
        </div>
        <div className={styles.title}>メンテナンス中</div>
        <div className={styles.desc}>
          <p>ロイヤルムーンは</p>
          <p>2023年1月18日10:00〜12:00</p>
          <p>にメンテナンスを行いますのでご利用いただけません。</p>
          <p>ご不便おかけして申し訳ございません。</p>
        </div>
      </div>
    </div>
  );
};
