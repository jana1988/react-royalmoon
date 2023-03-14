import styles from "./index.less";
import { RtpPercent } from "@/components/Ui/Icon";
import { useIntl } from "react-intl";
import { LoadingScope } from "@/components/Ui";
import { isNmunber, isRtpDn, isMobile } from "@/utils";
export default (props) => {
  const {
    rtp = "",
    dailyRTP = "",
    weekRTP = "",
    monthRTP = "",
    biggest_win = "",
    isHovered = false,
    className = "",
    visible = false,
    style = {},
    onClose = null,
  } = props;
  const intl = useIntl();

  return (
    <div
      className={`${styles.rtp} ${className}`}
      style={style}
      onClick={onClose}>
      {isHovered || visible ? (
        <div className={styles.content}>
          {!isMobile() && <div className={styles.triangle}></div>}

          <div className={styles.body}>
            <div className={styles.line}>
              <div className={styles.text}>
                <span className={styles.left}>RTP</span>
                {/* <span className={styles.right}>94.8%</span> */}
              </div>
              <div className={styles.text}>
                {/* <span className={styles.left}>我的RTP</span> */}
                <span className={styles.right}>
                  {isNmunber(rtp * 1) ? (
                    <>{(rtp * 1).toFixed(1)}%</>
                  ) : (
                    <LoadingScope />
                  )}
                </span>
              </div>
            </div>
            <div className={styles.line}>
              <div className={styles.text}>
                <span className={styles.left}>
                  {intl.$t({ id: "RTP_24H" })}
                </span>

                <span
                  className={`${styles.right} ${
                    isRtpDn(dailyRTP, rtp) ? styles.dn : ""
                  } `}>
                  {isNmunber(dailyRTP) ? (
                    <>
                      {(dailyRTP * 100).toFixed(1)}%
                      <RtpPercent />
                    </>
                  ) : (
                    <LoadingScope />
                  )}
                </span>
              </div>
              <div className={styles.text}>
                <span className={styles.left}>
                  {intl.$t({ id: "RTP_WEEK" })}
                </span>
                <span
                  className={`${styles.right}  ${
                    isRtpDn(weekRTP, rtp) ? styles.dn : ""
                  }`}>
                  {isNmunber(weekRTP) ? (
                    <>
                      {(weekRTP * 100).toFixed(1)}%
                      <RtpPercent />
                    </>
                  ) : (
                    <LoadingScope />
                  )}
                </span>
              </div>
              <div className={styles.text}>
                <span className={styles.left}>
                  {intl.$t({ id: "RTP_MONTH" })}
                </span>
                <span
                  className={`${styles.right} ${
                    isRtpDn(monthRTP, rtp) ? styles.dn : ""
                  }`}>
                  {isNmunber(monthRTP) ? (
                    <>
                      {(monthRTP * 100).toFixed(1)}%
                      <RtpPercent />
                    </>
                  ) : (
                    <LoadingScope />
                  )}
                </span>
              </div>
            </div>
            <div className={styles.line}>
              <div className={styles.text}>
                <span className={styles.left}>
                  {intl.$t({ id: "RTP_LARGEST_WIN" })}
                </span>
              </div>
              <div className={styles.text}>
                <span className={`${styles.right} ${styles.ct}`}>
                  {isNmunber(biggest_win) ? (
                    <>{biggest_win.toFixed(1)}X</>
                  ) : (
                    <LoadingScope />
                  )}
                </span>
              </div>
            </div>
            {/* <div className="labels">
    <span className="label">Jackpot</span>
    <span className="label">Animal</span>
    <span className="label">Buy Bonus</span>
  </div> */}
          </div>
        </div>
      ) : null}
    </div>
  );
};
