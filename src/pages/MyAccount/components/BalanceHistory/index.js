import { useState, useEffect } from "react";
import { Table, Loading, Empty, PaginationMb } from "@/components/Ui";
import desktopStyles from "../../desktop.less";
import mobileStyles from "../../mobile.less";
import { isMobile, toFixed2 } from "@/utils";
import { getTransactions } from "@/services/myAccount";
import dayjs from "@/common/day";
import { useIntl } from "react-intl";
import BalanceDetail from "./BalanceDetail";
import {
  balanceHistoryColumns as columns,
  bettingHistoryCategorys as categorys,
} from "../../constant";
import SearchForm from "../SearchForm";

export default () => {
  const intl = useIntl();
  const [category, setCategory] = useState(-1);

  const [visible, setVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  const [createdAtStart, setCreatedAtStart] = useState(
    dayjs().subtract(7, "day").startOf("date").format(),
  );
  const [createdAtEnd, setCreatedAtEnd] = useState(dayjs().format());
  const [objPage, setObjPage] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const styles = isMobile() ? mobileStyles : desktopStyles;

  useEffect(() => {
    fetchTransactions();
  }, []);

  function mobileItemRender(item, index) {
    return (
      <div
        key={index}
        className={`
          ${styles["history-item"]}
          ${styles["balance-history-item"]}
        `}
        onClick={() => {
          setCurrentItem(item);
          setVisible(true);
        }}>
        <div className={styles["history-item-row"]}>
          <div className={styles["history-item-col"]}>
            <div className={styles["history-item-number"]}>
              {intl.$t({ id: `BALANCE_STATUS_${item.type}` })}
            </div>
          </div>
          <div className={styles["history-item-col"]}></div>
          <div className={styles["history-item-col"]}>
            <div className={styles["history-item-status"]}>
              {dayjs(item.createdAt)
                .tz("Asia/Tokyo")
                .format("YYYY-MM-DD HH:mm")}
            </div>
          </div>
        </div>
        <div className={styles["history-item-row"]}>
          <div className={styles["history-item-col"]}>
            <div className={styles["history-item-number"]}>
              {intl.$t({ id: "BEFORE" })}: {toFixed2(item.balanceBefore)}
            </div>
          </div>
          <div className={styles["history-item-col"]}>
            <div className={styles["history-item-number"]}>
              ${toFixed2(item.amount)}
            </div>
          </div>
          <div className={styles["history-item-col"]}>
            <div className={styles["history-item-number"]}>
              {intl.$t({ id: "AFTER" })}: {toFixed2(item.balanceAfter)}
            </div>
          </div>
        </div>
      </div>
    );
  }
  async function fetchTransactions({ page = 1, limit = 10 } = {}) {
    try {
      setLoading(true);
      const config = {
        page,
        limit,
        createdAtStart,
        createdAtEnd,
      };
      // if (category > -1) config.status = category;

      const res = await getTransactions(config);
      setLoading(false);
      if (isMobile()) {
        setDataSource((data) => data.concat(res.list));
      } else {
        setDataSource(res.list || []);
      }
      setObjPage({ limit, page, total: res.total || 0 });
    } catch (error) {
      setLoading(false);
    }
  }

  function onSearch() {
    setDataSource([]);
    fetchTransactions({
      page: 1,
    });
  }

  return (
    <div className={styles["tab-content"]}>
      <SearchForm
        // selects={categorys}
        onSearch={onSearch}
        onStartTime={(date) => {
          setCreatedAtStart(date);
        }}
        onEndTime={(date) => {
          setCreatedAtEnd(date);
        }}
        // onSelect={(value) => {
        //   setCategory(value);
        // }}
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

                  fetchTransactions({
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
          <BalanceDetail
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
            fetchTransactions({
              page,
              limit,
            });
          }}
        />
      )}
    </div>
  );
};
