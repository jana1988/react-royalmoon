import { createPortal } from "react-dom";
import styles from "../DepositHistory/DepositDetail.less";
import { useEffect } from "react";
import { Close } from "@/components/Ui/Icon";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import useScrollPenetrate from "@/common/useScrollPenetrate";
import { toFixed2 } from "@/utils";
const BalanceDetail = ({ visible, onClose, data }) => {
  const [modalVisible, modalHide] = useScrollPenetrate();

  useEffect(() => {
    if (visible) {
      modalVisible();
    } else {
      modalHide();
    }
  }, [visible]);
  const container = visible ? (
    <div className={styles.modal}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <FormattedMessage id="ACCOUNT_TRANSACTION_DETAILS" />
          <div className={styles.close} onClick={onClose}>
            <Close />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.item}>
            <div>
              <FormattedMessage id="ORDER_NUMBER" />
            </div>
            <div>{data.externalTransactionId || "-"}</div>
          </div>
          <div className={styles.item}>
            <div>
              <FormattedMessage id="TYPE" />
            </div>
            <div>
              <FormattedMessage id={`BALANCE_STATUS_${data.type}`} />
            </div>
          </div>
          <div className={styles.item}>
            <div>
              <FormattedMessage id="DEPOSIT_AMOUNT" />
            </div>
            <div>{toFixed2(data.amount)}</div>
          </div>
          <div className={styles.item}>
            <div>
              <FormattedMessage id="FINAL_AMOUNT" />
            </div>
            <div>{toFixed2(data.balanceAfter)}</div>
          </div>
          <div className={styles.item}>
            <div>
              <FormattedMessage id="CHARGE_TIME" />
            </div>
            <div>
              {dayjs(data.createdAt)
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

export default BalanceDetail;
