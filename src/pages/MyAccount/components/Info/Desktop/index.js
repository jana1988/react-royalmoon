import styles from "./index.less";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { toFixed2 } from "@/utils";

export default (props) => {
  const { wallets = {}, playerInfo = {} } = props;
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <div className={styles["info-content"]}>
      <div className={`${styles.card} ${styles["wallet-card"]}`}>
        <div className={styles["card-title"]}>
          {intl.$t({ id: "CASH_WALLET" })}
        </div>
        <div className={styles["wallet-card-body"]}>
          <div className={styles["card-number"]}>
            <span>$</span>
            <span>{toFixed2(wallets.balance)}</span>
          </div>
          <div className={styles["card-btns"]}>
            <button
              className={`
                ${styles["card-btn"]}
                ${styles["card-btn-primary"]}
              `}
              onClick={() => {
                navigate("/personal/depositwithdraw", {
                  state: { activeKey: "1" },
                });
              }}>
              {intl.$t({ id: "DEPOSIT" })}
            </button>
            <button
              className={styles["card-btn"]}
              onClick={() => {
                navigate("/personal/depositwithdraw", {
                  state: { activeKey: "2" },
                });
              }}>
              {intl.$t({ id: "WITHDRAW" })}
            </button>
          </div>
        </div>
      </div>
      {/* <div className={`${styles.card} ${styles["level-card"]}`}>
        <div className={styles["card-title"]}>
          {intl.$t({ id: "UNTIL_THE_NEXT_LEVEL" })}
        </div>
        <div className={styles["level-card-body"]}>
          <div className={styles["level-card-row"]}>
            <div className={styles["level-card-label"]}>
              {intl.$t({ id: "LEFT_TO_DEPOSIT" })}
            </div>
            <div className={styles["card-number"]}>
              <span>$</span>
              <span>{playerInfo.levelUpRemainingDeposit || 0}</span>
            </div>
          </div>
          <div className={styles["level-card-row"]}>
            <div className={styles["level-card-label"]}>
              {intl.$t({ id: "LEFT_TO_WAGER" })}
            </div>
            <div className={styles["card-number"]}>
              <span>$</span>
              <span>{playerInfo.levelUpRemainingBet || 0}</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};
