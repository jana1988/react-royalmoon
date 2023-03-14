import { createPortal } from "react-dom";
import styles from "../DepositHistory/DepositDetail.less";
import { useEffect } from "react";
import { Close } from "@/components/Ui/Icon";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import { toFixed2 } from "@/utils";

const WithdrawalDetail = ({ visible, onClose, data }) => {
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "scroll";
  }, [visible]);

  console.log(1111111111, data);

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
            <div>{data.thirdPartyPaymentName || "-"}</div>
          </div>
          <div className={styles.item}>
            <div>
              <FormattedMessage id="AMOUNT" />
            </div>
            <div>{toFixed2(data.amount)}</div>
          </div>
          <div className={styles.item}>
            <div>
              <FormattedMessage id="STATUS" />
            </div>
            <div>
              <FormattedMessage id={`WITHDRAWAL_STATUS_${data.status}`} />
            </div>
          </div>
          <div className={styles.item}>
            <div>
              <FormattedMessage id="TIME" />
            </div>
            <div>
              {dayjs(data.requestedDate)
                .tz("Asia/Tokyo")
                .format("YYYY-MM-DD HH:mm:ss")}
            </div>
          </div>
          <div className={styles.item}>
            <div>
              <FormattedMessage id="REASON" />
            </div>
            <div>
              {data.status === 11 ? data?.comments[1]?.comment : "-"}
              {}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
  return createPortal(container, document.body);
};

export default WithdrawalDetail;
