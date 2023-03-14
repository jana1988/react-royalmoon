import { useState, useEffect } from "react";
import { Table, Loading, Empty, PaginationMb, Toast } from "@/components/Ui";

import desktopStyles from "../../desktop.less";
import mobileStyles from "../../mobile.less";
import { isMobile } from "@/utils";
import { getGameLog } from "@/services/myAccount";
import dayjs from "@/common/day";
import { useIntl } from "react-intl";
import BettingDetail from "./BettingDetail";
import {
  bettingHistoryColumns as columns,
  bettingHistoryCategorys as categorys,
} from "../../constant";
import { Expand } from "@/components/Ui/Icon";
import SearchForm from "../SearchForm";

export default () => {
  const intl = useIntl();
  const [category, setCategory] = useState(-1);

  const [visible, setVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  const [betTimeStart, setBetTimeStart] = useState(
    dayjs().subtract(7, "day").startOf("date").format(),
  );
  const [betTimeEnd, setBetTimeEnd] = useState(dayjs().format());
  const [objPage, setObjPage] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const styles = isMobile() ? mobileStyles : desktopStyles;

  useEffect(() => {
    fetchGameLog();
  }, []);

  function fetchGameLog({ page = 1, limit = 10 } = {}) {
    if (dayjs(betTimeEnd).diff(betTimeStart, "day") > 31) {
      Toast.info(intl.$t({ id: "WITHIN_31_DAYS" }));

      return;
    }
    const config = {
      page,
      limit,
      betTimeStart,
      betTimeEnd,
    };

    if (category > -1) config.status = category;
    setLoading(true);

    getGameLog(config)
      .then((res) => {
        setLoading(false);
        if (isMobile()) {
          setDataSource((data) => data.concat(res.list.list));
        } else {
          setDataSource(res.list.list || []);
        }
        setObjPage({ limit, page, total: res.list.total || 0 });
      })
      .catch(() => {
        setLoading(false);
      });
  }

  function onSearch() {
    setDataSource([]);
    fetchGameLog({
      page: 1,
    });
  }

  function mobileItemRender(item, index) {
    return (
      <div
        key={index}
        className={styles["history-item"]}
        onClick={() => {
          setCurrentItem(item);
          setVisible(true);
        }}>
        <div className={styles["betting-row"]}>
          <div className={styles["betting-gameName"]}>{item.gameName}</div>
          <div className={styles["betting-status"]}>
            {item.gameApi.name.replace("SoftGamings", "")}
          </div>
        </div>
        <div className={styles["history-item-row"]}>
          <div className={styles["history-item-col"]}>
            <div className={styles["history-item-value"]}>
              {(Number(item.payout) - Number(item.bet)).toFixed(2)}
            </div>
          </div>
          <div className={styles["history-item-col"]}>
            <div className={styles["history-item-number"]}>
              {intl.$t({ id: "DETAIL" })}
              <Expand />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["tab-content"]}>
      <SearchForm
        selects={categorys}
        onSearch={onSearch}
        onStartTime={(date) => {
          setBetTimeStart(date);
        }}
        onEndTime={(date) => {
          setBetTimeEnd(date);
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
                  fetchGameLog({ page: objPage.page + 1 });
                }}
              />
            </div>
          ) : (
            <Empty
              className={styles.empty}
              text={intl.$t({ id: "REPORT_FORM_NO_DATA" })}
            />
          )}
          <BettingDetail
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
            fetchGameLog({ page, limit });
          }}
        />
      )}
    </div>
  );
};
