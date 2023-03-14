import { createPortal } from "react-dom";
import styles from "./DepositDetail.less";
import { useEffect } from "react";
import { Close } from "@/components/Ui/Icon";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import { toFixed2 } from "@/utils";

const DepositDetail = ({ visible, onClose, data }) => {
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
              <FormattedMessage id="ORDER_NUMBER" />
            </div>
            <div>{data.id}</div>
          </div>
          <div className={styles.item}>
            <div>
              <FormattedMessage id="PAYMENT" />
            </div>
            <div>{data.paymentMethod.name}</div>
          </div>
          <div className={styles.item}>
            <div>
              <FormattedMessage id="DEPOSIT_AMOUNT" />
            </div>
            <div>{toFixed2(data.amount)}</div>
          </div>
          <div className={styles.item}>
            <div>
              <FormattedMessage id="DEPOSIT_TIME" />
            </div>
            <div>
              {dayjs(data.requestedDate)
                .tz("Asia/Tokyo")
                .format("YYYY-MM-DD HH:mm:ss")}
            </div>
          </div>
          <div className={styles.item}>
            <div>
              <FormattedMessage id="BONUS" />
            </div>
            <div>-</div>
          </div>
          <div className={styles.item}>
            <div>
              <FormattedMessage id="STATUS" />
            </div>
            <div>
              <FormattedMessage id={`DEPOSIT_STATUS_${data.status}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
  return createPortal(container, document.body);
};

export default DepositDetail;
