import { useState, useEffect } from "react";
import { Table, Loading, Empty, PaginationMb } from "@/components/Ui";
import desktopStyles from "../../desktop.less";
import mobileStyles from "../../mobile.less";
import { isMobile, toFixed2 } from "@/utils";
import { getRewardHistory } from "@/services/myAccount";
import { useIntl } from "react-intl";
import dayjs from "@/common/day";
import {
  rewardHistoryColumns as columns,
  rewardHistorySourceType,
} from "../../constant";

export default () => {
  const intl = useIntl();
  const [objPage, setObjPage] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [dataSource, setDataSource] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const styles = isMobile() ? mobileStyles : desktopStyles;

  function fetchTransactions(params) {
    setLoading(true);
    getRewardHistory(params)
      .then((data) => {
        setLoading(false);
        setAllData(data);
        setDataSource(data.slice(objPage.page - 1, objPage.limit));
        setObjPage((obj) => ({ ...obj, total: data.length || 0 }));
      })
      .catch(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchTransactions({ ...objPage });
  }, []);

  useEffect(() => {
    if (isMobile()) {
      setDataSource((source) =>
        source.concat(
          allData.slice(
            (objPage.page - 1) * objPage.limit,
            objPage.limit + (objPage.page - 1) * objPage.limit,
          ),
        ),
      );
    } else {
      setDataSource(
        allData.slice(
          (objPage.page - 1) * objPage.limit,
          objPage.limit + (objPage.page - 1) * objPage.limit,
        ),
      );
    }
  }, [objPage.page]);

  function mobileItemRender(item, index) {
    return (
      <div className={styles["reward-row"]} key={index}>
        <div className={styles["reward-col-item"]}>
          <div className={styles["reward-col-label"]}>
            {intl.$t({ id: "CATEGORY" })}
          </div>
          <div className={styles["reward-col-value"]}>
            {rewardHistorySourceType[item.sourceType]}
          </div>
        </div>
        <div className={styles["reward-col-item"]}>
          <div className={styles["reward-col-label"]}>
            {intl.$t({ id: "PROMOTIONS" })}
          </div>
          <div className={styles["reward-col-value"]}>
            {item.promoName || "-"}
          </div>
        </div>
        <div className={styles["reward-col-item"]}>
          <div className={styles["reward-col-label"]}>
            {intl.$t({ id: "VALUE" })}
          </div>
          <div className={styles["reward-col-value"]}>
            {toFixed2(item.lockedOnAmount)}
          </div>
        </div>
        <div className={styles["reward-col-item"]}>
          <div className={styles["reward-col-label"]}>
            {intl.$t({ id: "REQUIRED_WAGERING" })}
          </div>
          <div className={styles["reward-col-value"]}>
            {toFixed2(item.betRequired)}
          </div>
        </div>
        <div className={styles["reward-col-item"]}>
          <div className={styles["reward-col-label"]}>
            {intl.$t({ id: "WAGERED" })}
          </div>
          <div className={styles["reward-col-value"]}>
            {toFixed2(item.betAmount)}
          </div>
        </div>
        <div className={styles["reward-col-item"]}>
          <div className={styles["reward-col-label"]}>
            {intl.$t({ id: "GRANTED_DATE" })}
          </div>
          <div className={styles["reward-col-value"]}>
            {dayjs(item.createdAt)
              .tz("Asia/Tokyo")
              .format("YYYY-MM-DD HH:mm:ss")}
          </div>
        </div>
        <div className={styles["reward-col-item"]}>
          <div className={styles["reward-col-label"]}>
            {intl.$t({ id: "STATUS" })}
          </div>
          <div className={styles["reward-col-value"]}>
            {intl.$t({ id: `REWARD_STATUS_${item.status}` })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["tab-content"]}>
      {isMobile() ? (
        <div className={styles["reward-content"]}>
          {loading && objPage.page === 1 ? (
            <Loading />
          ) : dataSource.length ? (
            <div>
              {dataSource.map((item, index) => mobileItemRender(item, index))}
              <PaginationMb
                loading={loading}
                text={intl.$t({ id: "PROMOTIONS_BUTTON" })}
                objPage={objPage}
                onClick={() => {
                  setObjPage({ ...objPage, page: objPage.page + 1 });
                }}
              />
            </div>
          ) : (
            <Empty
              className={styles.empty}
              text={intl.$t({ id: "REPORT_FORM_NO_DATA" })}
            />
          )}
        </div>
      ) : (
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          pagination={objPage}
          emptyText={intl.$t({ id: "REPORT_FORM_NO_DATA" })}
          onChange={(page, limit) => {
            setObjPage({ ...objPage, page, limit });
          }}
        />
      )}
    </div>
  );
};
