import { Button, Toast, Table, Img, NavBar, Loading } from "@/components/Ui";
import { useEffect, useState } from "react";
import {
  getAgentsPlayersById,
  getAgentTrackingCodes,
} from "@/services/personal";
import { useSelector, useDispatch } from "react-redux";
import copy from "copy-to-clipboard";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import styles from "./index.less";
import { isMobile } from "@/utils";

import line from "@/assets/footer/icon_line@2x.png";
import facebook from "@/assets/footer/logo_facebook@2x.png";
import instagram from "@/assets/footer/logo_instagram@2x.png";
import twitter from "@/assets/footer/logo_twitter@2x.png";
import { useIntl } from "react-intl";
import { initial } from "lodash";
import useGuard from "@/hooks/useGuard";

export default () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  useGuard();
  const { agent } = useSelector((state) => state.personal);

  const [objPage, setObjPage] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [dataSource, setDataSource] = useState([]);
  const [inviteLink, setInviteLink] = useState("");
  const [loading, setLoading] = useState(false);
  const intl = useIntl();
  const columns = [
    {
      title: intl.$t({ id: "USERNAME" }),
      dataIndex: "name",
      align: "left",
      className: "abc",
      width: 316,
    },
    {
      title: intl.$t({ id: "REGISTRATION_DATE" }),
      dataIndex: "signupDate",
      align: "left",
      width: 223,
      render: (text) => {
        return text
          ? dayjs(text).tz("Asia/Tokyo").format("YYYY-MM-DD HH:mm:ss")
          : "-";
      },
    },
    {
      title: intl.$t({ id: "FIRST_DEPOSIT_DATE" }),
      dataIndex: "firstDepositRequestedDate",
      align: "left",
      render: (text, record) => {
        return text
          ? dayjs(text).tz("Asia/Tokyo").format("YYYY-MM-DD HH:mm:ss")
          : "-";
      },
    },
  ];

  const fetchAgentsPlayers = async () => {
    try {
      setLoading(true);
      const res = await getAgentsPlayersById(objPage);
      setLoading(false);
      setDataSource(res.list);
      setObjPage((obj) => ({ ...obj, total: res.total || 0 }));
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchAgentTrackingCodes = async () => {
    const res = await getAgentTrackingCodes();
    if (res && res[0]) {
      setInviteLink(res[0].url);
    }
  };

  useEffect(() => {
    if (agent?.agentId || localStorage.getItem("agentId")) {
      fetchAgentsPlayers();
    }
  }, [objPage.page, agent?.agentId]);

  useEffect(() => {
    function rightCartData() {
      const item = JSON.parse(localStorage.getItem("agentId"));
      if (item) {
        fetchAgentsPlayers();
      }
    }
    window.addEventListener("storage", rightCartData);
    return () => {
      window.removeEventListener("storage", rightCartData);
    };
  }, []);

  useEffect(() => {
    fetchAgentTrackingCodes();
  }, []);

  return (
    <div className={styles.invite_friends}>
      <div className={styles.content}>
        {isMobile() ? (
          <NavBar title={intl.$t({ id: "PERSONAL_TAB_6" })} />
        ) : null}
        <div className={styles.header}>
          <div className={styles.box}>
            <div className={styles.wrap}>
              <div className={styles.link_text}>
                {intl.$t({ id: "SHARE_YOUR_REFERRAL_LINK" })}
              </div>
              <div className={styles.main}>
                <input placeholder={inviteLink} disabled={true} />
                <Button
                  className={styles.button}
                  onClick={() => {
                    copy(inviteLink);
                    Toast.info(intl.$t({ id: "LINK_COPIED" }));
                  }}>
                  {intl.$t({ id: "COPY_LINK" })}
                </Button>
              </div>
            </div>
            <div className={styles.wrap}>
              <div className={styles.link_text}>
                {intl.$t({ id: "SHARE_ON_SOCIAL_MEDIA" })}
              </div>
              <div className={styles.imgs}>
                {[
                  {
                    icon: facebook,
                    path: "https://www.facebook.com/profile.php?id=100079546664345",
                  },
                  {
                    icon: twitter,
                    path: "https://twitter.com/royalmooncasino",
                  },
                  {
                    icon: instagram,
                    path: "https://www.instagram.com/royalmooncasino/",
                  },
                  {
                    icon: line,
                    path: "https://line.me/R/ti/p/@882qptva?from=page",
                  },
                ].map((item, index) => (
                  <a
                    target="_blank"
                    key={index}
                    className={styles.img}
                    href={item.path}>
                    <Img src={item.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className={`${styles.box} ${styles.box_right}`}>
            <div className={styles.num_text}>
              <div className={styles.left}>
                {intl.$t({ id: "TOTAL_REFERRALS" })}
              </div>
              <div className={styles.right}>{agent.registerCount || 0} </div>
            </div>
            <div className={styles.num_text}>
              <div className={styles.left}>
                {intl.$t({ id: "DEPOSIT_REFERRALS" })}
              </div>
              <div className={styles.right}>{agent.depositorCount || 0} </div>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.title}>
            {intl.$t({ id: "REFERRAL_HISTORY" })}
          </div>
          {isMobile() ? (
            loading ? (
              <Loading />
            ) : (
              dataSource.map((item, index) => (
                <div className={styles.card_mobile} key={index}>
                  <div className={styles.card}>
                    <div className={styles.name}>
                      {intl.$t({ id: "USERNAME" })}
                    </div>
                    <div className={styles.value}>{item.name}</div>
                  </div>
                  <div className={styles.card}>
                    <div className={styles.name}>
                      {intl.$t({ id: "REGISTRATION_DATE" })}
                    </div>
                    <div className={styles.value}>
                      {item.signupDate
                        ? dayjs(item.signupDate)
                            .tz("Asia/Tokyo")
                            .format("YYYY-MM-DD HH:mm:ss")
                        : "-"}
                    </div>
                  </div>
                  <div className={styles.card}>
                    <div className={styles.name}>
                      {intl.$t({ id: "FIRST_DEPOSIT_DATE" })}
                    </div>
                    <div className={styles.value}>
                      {item.firstDepositRequestedDate
                        ? dayjs(item.firstDepositRequestedDate)
                            .tz("Asia/Tokyo")
                            .format("YYYY-MM-DD HH:mm:ss")
                        : "-"}
                    </div>
                  </div>
                </div>
              ))
            )
          ) : (
            <div className={styles.table}>
              <Table
                dataSource={dataSource}
                columns={columns}
                loading={loading}
                pagination={objPage}
                onChange={(page, limit) => {
                  setObjPage({ page, limit });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
