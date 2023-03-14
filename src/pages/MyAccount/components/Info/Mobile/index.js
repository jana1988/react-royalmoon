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
        <div className={styles["wallet-card-left"]}>
          <div className={styles["card-title"]}>
            {intl.$t({ id: "CASH_WALLET" })}
          </div>
          <div className={styles["card-number"]}>
            ${toFixed2(wallets.balance)}
          </div>
        </div>
        <div className={styles["wallet-card-right"]}>
          <button
            className={styles["card-btn"]}
            onClick={() =>
              navigate("/depositwithdraw", { state: { activeKey: "2" } })
            }>
            {intl.$t({ id: "WITHDRAW" })}
          </button>

          <button
            className={`
              ${styles["card-btn"]}
              ${styles["card-btn-primary"]}
            `}
            onClick={() =>
              navigate("/depositwithdraw", { state: { activeKey: "1" } })
            }>
            {intl.$t({ id: "DEPOSIT" })}
          </button>
        </div>
      </div>
      {/* <div className={`${styles.card} ${styles["bonus-wallet-card"]}`}>
        <div className={styles["bonus-wallet-card-row"]}>
          <div className={styles["bonus-wallet-card-col"]}>
            <div className={styles["card-title"]}>Cash Wallet</div>
          </div>
          <div className={styles["bonus-wallet-card-col"]}>
            <Link>View the rules</Link>
          </div>
        </div>
        <div className={styles["bonus-wallet-card-row"]}>
          <div className={styles["bonus-wallet-card-col"]}>
            <div className={styles["card-number"]}>1234.99</div>
          </div>
          <div className={styles["bonus-wallet-card-col"]}>
            <div className={styles["card-title"]}>
              Also $100000 bets to get $80 bonus
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className={`${styles.card} ${styles["level-card"]}`}>
        <div className={styles["card-title"]}>
          {intl.$t({ id: "UNTIL_THE_NEXT_LEVEL" })}
        </div>

        <div className={styles["level-card-row"]}>
          <div className={styles["level-card-col"]}>
            <div className={styles["card-title"]}>
              {intl.$t({ id: "MORE_TO_DEPOSIT" })}
            </div>
          </div>
          <div className={styles["level-card-col"]}>
            <div className={styles["card-title"]}>
              ${playerInfo.levelUpRemainingDeposit || 0}
            </div>
          </div>
        </div>
        <div className={styles["level-card-row"]}>
          <div className={styles["level-card-col"]}>
            <div className={styles["card-title"]}>
              {intl.$t({ id: "MORE_TO_ROLLOVER" })}
            </div>
          </div>
          <div className={styles["level-card-col"]}>
            <div className={styles["card-title"]}>
              ${playerInfo.levelUpRemainingBet || 0}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};
