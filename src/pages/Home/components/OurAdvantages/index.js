import styles from "./index.less";
import { Title } from "../";
import { FormattedMessage } from "react-intl";
import { free, good, advantage_user, gou } from "@/assets/home";
import { Img } from "@/components/Ui";

export default (props) => {
  return (
    <div className={styles.ourAdvantages}>
      <div className={styles.content}>
        <Title>
          <FormattedMessage id="OUR_ADVANTAGE" />
        </Title>
        <div className={styles.box}>
          <div className={styles.ul}>
            {[
              [
                free,
                <FormattedMessage id="NO_TRANSACTION_FEE" />,
                <FormattedMessage id="ALL_FEES_WAIVED" />,
              ],
              [
                advantage_user,
                <FormattedMessage id="_24_HOUR_SERVICE" />,
                <FormattedMessage id="_24_7_SUPPORT" />,
              ],
              [
                good,
                <FormattedMessage id="FAST_CONVENIENT" />,
                <FormattedMessage id="QUICKACCESS_BET_ANYTIME" />,
              ],
              [
                gou,
                <FormattedMessage id="SAFE_SECURE" />,
                <FormattedMessage id="SYSTEM_ENCRYPTION_KEEP_YOUR_FUNDS_SECURE" />,
              ],
            ].map((item, index) => (
              <div className={styles.liWarprer} key={index}>
                <div className={styles.li}>
                  <div className={styles.img}>
                    <Img src={item[0]} />
                  </div>
                  <div className={styles.title}>{item[1]}</div>
                  <div className={styles.desc}>{item[2]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
