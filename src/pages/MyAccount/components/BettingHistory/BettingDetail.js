import { createPortal } from "react-dom";
import styles from "../DepositHistory/DepositDetail.less";
import { useEffect } from "react";
import { Close } from "@/components/Ui/Icon";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";

const BettingDetail = ({ visible, onClose, data }) => {
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "scroll";
  }, [visible]);

  const container = visible ? (
    <div className={styles.modal}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <FormattedMessage id="RECORD_DETAIL" />
          <div className={styles.close} onClick={onClose}>
            <Close />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.item}>
            <div>
              <FormattedMessage id="PROVIDER" />
            </div>
            <div>{data.gameApi.name.replace("SoftGamings", "")}</div>
          </div>
          <div className={styles.item}>
            <div>
              <FormattedMessage id="GAME" />
            </div>
            <div>{data.gameName}</div>
          </div>
          <div className={styles.item}>
            <div>
              <FormattedMessage id="BETTING_AMOUNT" />
            </div>
            <div>{data.bet}</div>
          </div>
          <div className={styles.item}>
            <div>
              <FormattedMessage id="EFFECTIVE_AMOUNT" />
            </div>
            <div>{data.effectiveBet}</div>
          </div>
          <div className={styles.item}>
            <div>
              <FormattedMessage id="RESULT" />
            </div>
            <div>{(Number(data.payout) - Number(data.bet)).toFixed(2)}</div>
          </div>
          <div className={styles.item}>
            <div>
              <FormattedMessage id="BETTING_TIME" />
            </div>
            <div>
              {dayjs(data.betTime)
                .tz("Asia/Tokyo")
                .format("YYYY-MM-DD HH:mm:ss")}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
  return createPortal(container, document.body);
};

export default BettingDetail;
