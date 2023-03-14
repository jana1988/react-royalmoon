import { useEffect, useState } from "react";
import { getMessageList } from "@/services/privatemessage";
import { isMobile } from "@/utils";
import styles from "./index.less";
import { readMessage } from "@/services/privatemessage";
import mail from "@/assets/inbox/mail.svg";
import dayjs from "dayjs";

import {
  Pagination,
  Img,
  Loading,
  PopupMb,
  NavBar,
  PaginationMb,
} from "@/components/Ui";
import { useIntl } from "react-intl";
import useGuard from "@/hooks/useGuard";

const PrivateMessage = () => {
  useGuard();
  const intl = useIntl();
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [objPage, setObjPage] = useState({
    page: 1,
    limit: 7,
    total: 0,
  });

  const fetchMessage = async () => {
    try {
      setLoading(true);
      const res = await getMessageList();
      setLoading(false);
      if (res && res.length > 0) {
        // const _res = [
        //   ...res[0].messages,
        //   ...res[0].messages,
        //   ...res[0].messages,
        // ];
        const _res = res[0].messages;

        // setData(_res);
        setAllData(_res);
        setData(_res.slice(objPage.page - 1, objPage.limit));
        setObjPage((obj) => ({ ...obj, total: _res.length || 0 }));
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  useEffect(() => {
    if (isMobile()) {
      setData((source) =>
        source.concat(
          allData.slice(
            (objPage.page - 1) * objPage.limit,
            objPage.limit + (objPage.page - 1) * objPage.limit,
          ),
        ),
      );
    } else {
      setData(
        allData.slice(
          (objPage.page - 1) * objPage.limit,
          objPage.limit + (objPage.page - 1) * objPage.limit,
        ),
      );
    }
  }, [objPage.page]);

  const selectMessage = (item) => {
    setCurrentMessage(item);
    if (!item.read) {
      readMessage(item.id);
      setData((state) =>
        state.map((x) => {
          if (x.id === item.id) {
            return { ...x, read: true };
          }
          return x;
        }),
      );
    }
  };

  const renderList = () => {
    return (
      <ul>
        {data.map((item, index) => (
          <li
            key={index}
            onClick={() => selectMessage(item)}
            className={`${item.read ? "" : styles.notReaad}`}>
            <div>{item.subject}</div>
            <span>{dayjs(item.createdAt).format("YYYY-MM-DD")}</span>
          </li>
        ))}
      </ul>
    );
  };

  if (isMobile()) {
    return (
      <div className={styles.privateMessageMobile}>
        <div className={styles.inboxListMobile}>
          <NavBar title={intl.$t({ id: "NOTIFICATIONS_MOBILE_TITLE" })} />
          {loading ? (
            <Loading />
          ) : (
            <div className={styles.wrap}>
              {
                <ul>
                  {data.map((item) => (
                    <li
                      key={`${item.id}`}
                      onClick={() => selectMessage(item)}
                      className={`${item.read ? "" : styles.notReaad}`}>
                      <div className={styles.item}>
                        <div className={styles.subject}>{item.subject}</div>
                        <div className={styles.content}>{item.content}</div>
                      </div>
                      <span>{dayjs(item.createdAt).format("YYYY-MM-DD")}</span>
                    </li>
                  ))}
                </ul>
              }
              <PaginationMb
                loading={loading}
                text={intl.$t({ id: "PROMOTIONS_BUTTON" })}
                objPage={objPage}
                onClick={() => {
                  setObjPage({ ...objPage, page: objPage.page + 1 });
                }}
              />
            </div>
          )}
        </div>
        {currentMessage && (
          <PopupMb
            visible={true}
            title={currentMessage.subject}
            onClose={() => setCurrentMessage(null)}>
            <div className={styles.contentMobile}>{currentMessage.content}</div>
          </PopupMb>
        )}
      </div>
    );
  }

  return (
    <div className={styles.privateMessage}>
      <div className={styles.inboxList}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className={styles.header}>
              <Img src={mail} />
              {intl.$t({ id: "NOTIFICATIONS_TITLE" })}
            </div>
            {renderList()}
            <div className={styles.pageContainer}>
              <Pagination
                mode="simple"
                current={objPage.page}
                pageSize={objPage.limit}
                total={objPage.total}
                onChange={(page, limit) => {
                  setObjPage({ ...objPage, page, limit });
                }}
              />
            </div>
          </>
        )}
      </div>
      {currentMessage && (
        <div className={styles.inboxDetail}>
          <h6>{currentMessage.subject}</h6>
          <div>{currentMessage.content}</div>
        </div>
      )}
    </div>
  );
};

export default PrivateMessage;
