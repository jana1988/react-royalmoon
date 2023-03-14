import { useState, useEffect } from "react";
import { Table, Loading, Empty, PaginationMb } from "@/components/Ui";
import desktopStyles from "../../desktop.less";
import mobileStyles from "../../mobile.less";
import { isMobile, toFixed2 } from "@/utils";
import { getPaymentRequests } from "@/services/myAccount";
import dayjs from "@/common/day";

import { useIntl } from "react-intl";
import DepositDetail from "./DepositDetail";
import { Expand } from "@/components/Ui/Icon";
import {
  depositHistoryColumns as columns,
  depositHistoryCategorys as categorys,
} from "../../constant";
import SearchForm from "../SearchForm";

export default () => {
  const intl = useIntl();
  const [category, setCategory] = useState(-1);

  const [visible, setVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const styles = isMobile() ? mobileStyles : desktopStyles;

  const [requestedDateStart, setRequestedDateStart] = useState(
    dayjs().subtract(7, "day").startOf("date").format(),
  );
  const [requestedDateEnd, setRequestedDateEnd] = useState(dayjs().format());
  const [objPage, setObjPage] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  useEffect(() => {
    fetchPaymentRequests();
  }, []);

  function mobileItemRender(item, index) {
    return (
      <div
        key={index}
        className={styles["history-item"]}
        onClick={() => {
          setCurrentItem(item);
          setVisible(true);
        }}>
        <div className={styles["history-item-row"]}>
          <div className={styles["history-item-col"]}>
            <div className={styles["history-item-number"]}>{item.id}</div>
          </div>
          <div className={styles["history-item-col"]}>
            <div className={styles["history-item-status"]}>
              {intl.$t({ id: `DEPOSIT_STATUS_${item.status}` })}
            </div>
          </div>
        </div>
        <div className={styles["history-item-row"]}>
          <div className={styles["history-item-col"]}>
            <div className={styles["history-item-value"]}>
              +{toFixed2(item.amount)}
            </div>
          </div>
          <div className={styles["history-item-col"]}>
            <div className={`${styles["history-item-number"]}`}>
              {intl.$t({ id: "DETAIL" })}
              <Expand />
            </div>
          </div>
        </div>
      </div>
    );
  }
  async function fetchPaymentRequests({ page = 1, limit = 10 } = {}) {
    try {
      setLoading(true);
      const config = {
        page,
        limit,
        requestedDateStart,
        requestedDateEnd,
        sort: "requestedDate DESC",
      };
      if (category > -1) config.status = category;

      const res = await getPaymentRequests(config);
      setLoading(false);
      if (res.list) {
        if (isMobile()) {
          setDataSource((data) => data.concat(res.list));
        } else {
          setDataSource(res.list || []);
        }
        setObjPage((obj) => ({ ...obj, total: res.total || 0 }));
      }
    } catch (error) {
      setLoading(false);
    }
  }

  function onSearch() {
    setDataSource([]);
    fetchPaymentRequests({
      page: 1,
    });
  }
  return (
    <div className={styles["tab-content"]}>
      <SearchForm
        selects={categorys}
        onSearch={onSearch}
        onStartTime={(date) => {
          setRequestedDateStart(date);
        }}
        onEndTime={(date) => {
          setRequestedDateEnd(date);
        }}
        onSelect={(value) => {
          setCategory(value);
        }}
      />

      {isMobile() ? (
        <div className={styles["items-content"]}>
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
                  setObjPage({ page: objPage.page + 1 });
                  fetchPaymentRequests({
                    page: objPage.page + 1,
                  });
                }}
              />
            </div>
          ) : (
            <Empty
              className={styles.empty}
              text={intl.$t({ id: "REPORT_FORM_NO_DATA" })}
            />
          )}

          <DepositDetail
            visible={visible}
            data={currentItem}
            onClose={() => setVisible(false)}
          />
        </div>
      ) : (
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          pagination={objPage}
          emptyText={intl.$t({ id: "REPORT_FORM_NO_DATA" })}
          onChange={(page, limit) => {
            fetchPaymentRequests({
              page,
              limit,
            });
          }}
        />
      )}
    </div>
  );
};
