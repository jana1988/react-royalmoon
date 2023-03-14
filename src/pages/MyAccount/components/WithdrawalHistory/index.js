import { useState, useEffect } from "react";
import {
  Table,
  Loading,
  Empty,
  PaginationMb,
  Button,
  Modal,
} from "@/components/Ui";
import desktopStyles from "../../desktop.less";
import mobileStyles from "../../mobile.less";
import { isMobile, toFixed2 } from "@/utils";
import { getWithdrawRequests } from "@/services/myAccount";
import dayjs from "@/common/day";
import { useIntl } from "react-intl";
import WithdrawalDetail from "./WithdrawalDetail";
import {
  withdrawalHistoryColumns,
  withdrawalHistoryCategorys as categorys,
} from "../../constant";
import { Expand } from "@/components/Ui/Icon";
import SearchForm from "../SearchForm";

export default () => {
  const intl = useIntl();
  const [category, setCategory] = useState(-1);

  const [visible, setVisible] = useState(false);
  const [visibleRejectReason, setVisibleRejectReason] = useState(false);

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
  const [rejectReasonText, setRejectReasonText] = useState("");

  const columns = [
    ...withdrawalHistoryColumns,
    {
      title: intl.$t({ id: "REASON" }),
      dataIndex: "comments",
      render: (text, record) => {
        if (record.status !== 11) {
          return "-";
        }
        return (
          <Button
            onClick={() => {
              if (text.length > 1) {
                setRejectReasonText(text[1].comment);
              }
              setVisibleRejectReason(true);
            }}>
            {intl.$t({ id: "REASON" })}
          </Button>
        );
      },
      width: 163,
    },
  ];

  async function fetchWithdrawRequests({ page = 1, limit = 10 } = {}) {
    const config = {
      page,
      limit,
      type: 1,
      sort: "requestedDate DESC",
      createdAtStart,
      createdAtEnd,
    };
    if (category > -1) config.status = category;

    setLoading(true);
    try {
      const res = await getWithdrawRequests(config);
      setLoading(false);
      if (res.list) {
        if (isMobile()) {
          setDataSource((data) => data.concat(res.list));
        } else {
          setDataSource(res.list);
        }
      }
      setObjPage((obj) => ({ ...obj, total: res.total || 0 }));
    } catch (error) {
      setLoading(false);
    }
  }

  function onSearch() {
    setDataSource([]);
    fetchWithdrawRequests({
      page: 1,
    });
  }

  useEffect(() => {
    fetchWithdrawRequests();
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
            <div className={styles["history-item-number"]}>
              {item.id || "-"}
            </div>
          </div>
          <div className={styles["history-item-col"]}>
            <div className={styles["history-item-status"]}>
              {intl.$t({ id: `WITHDRAWAL_STATUS_${item.status}` })}
            </div>
          </div>
        </div>
        <div className={styles["history-item-row"]}>
          <div className={styles["history-item-col"]}>
            <div className={styles["history-item-value"]}>{`-${toFixed2(
              item.amount,
            )}`}</div>
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

  const onCloseRejectReasonModal = () => {
    setVisibleRejectReason(false);
    setRejectReasonText("");
  };

  const renderRejectReasonModal = () => {
    return (
      <Modal
        visible={visibleRejectReason}
        onOk={onCloseRejectReasonModal}
        onCancel={onCloseRejectReasonModal}
        title={intl.$t({ id: "REASON" })}
        footerName={intl.$t({ id: "COLLAPSE" })}>
        <div className={styles.content}>{rejectReasonText}</div>
      </Modal>
    );
  };

  return (
    <div className={styles["tab-content"]}>
      <SearchForm
        selects={categorys}
        onSearch={onSearch}
        onStartTime={(date) => {
          setCreatedAtStart(date);
        }}
        onEndTime={(date) => {
          setCreatedAtEnd(date);
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
                  setObjPage({ ...objPage, page: objPage.page + 1 });
                  fetchWithdrawRequests({
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
          <WithdrawalDetail
            visible={visible}
            data={currentItem}
            onClose={() => setVisible(false)}
          />
        </div>
      ) : (
        <Table
          rowKey="key"
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          pagination={objPage}
          emptyText={intl.$t({ id: "REPORT_FORM_NO_DATA" })}
          onChange={(page, limit) => {
            fetchWithdrawRequests({
              page,
              limit,
            });
          }}
        />
      )}
      {renderRejectReasonModal()}
    </div>
  );
};
