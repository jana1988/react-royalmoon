import { useState } from "react";
import { Menu, Button, Img } from "@/components/Ui";
import {
  AcCharge,
  AcDiscount,
  AcInvitefriend,
  AcSetting,
  User,
  AcAlarm,
  Back,
  Cash,
} from "@/components/Ui/Icon";
import styles from "./index.less";

import { Link, Outlet, useLocation } from "react-router-dom";
import NewLink from "@/components/Link";

import { isMobile, toFixed2 } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { removeToken, onChange, setUserInfo } from "@/store/reducer/authSlice";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { getAgent } from "@/services/personal";
import { useEffect } from "react";
import { setAgent } from "@/store/reducer/personalSlice";
import { getWalletsById, getPlayerInfo } from "@/services/myAccount";

import VIP0 from "@/assets/vip/icon_vip0.webp";
import VIP1 from "@/assets/vip/icon_vip1.webp";
import VIP2 from "@/assets/vip/icon_vip2.webp";
import VIP3 from "@/assets/vip/icon_vip3.webp";
import VIP4 from "@/assets/vip/icon_vip4.webp";
import VIP5 from "@/assets/vip/icon_vip5.webp";
import VIP6 from "@/assets/vip/icon_vip6.webp";
import VIP7 from "@/assets/vip/icon_vip7.webp";
import VIP8 from "@/assets/vip/icon_vip8.webp";
import VIP9 from "@/assets/vip/icon_vip9.webp";

// import logo from "@/assets/logo.webp";
import { logo } from "@/assets";

const vipMenu = {
  VIP0,
  VIP1,
  VIP2,
  VIP3,
  VIP4,
  VIP5,
  VIP6,
  VIP7,
  VIP8,
  VIP9,
  VIP10: VIP0,
};

const Index = (props) => {
  const { isLogin } = useSelector((state) => state.auth);

  const location = useLocation();
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [playerInfo, setPlayerInfo] = useState({});
  const [balance, setBalance] = useState(0);

  const fetchAgent = async () => {
    const res = await getAgent();
    if (res) {
      localStorage.setItem("agentId", res.agentId);
      dispatch(setAgent(res));
    }
  };

  const fetchWallets = async () => {
    const data = await getWalletsById(0);
    if (data) {
      setBalance(data.balance || 0);
    }
  };
  async function fetchPlayerInfo() {
    const data = await getPlayerInfo();
    setPlayerInfo(data);
    dispatch(setUserInfo(data));
  }

  useEffect(() => {
    if (isLogin) {
      fetchAgent();
      fetchWallets();
      fetchPlayerInfo();
    }
  }, [isLogin]);

  const personalPc = () => (
    <div className={styles.personalPc}>
      <div className={styles.personalWrap}>
        <div className={styles.left}>
          <div className={styles.img}>
            <Img
              src={
                vipMenu[
                  playerInfo && playerInfo.group?.name
                    ? playerInfo.group.name
                    : "VIP10"
                ]
              }
            />
            <div className={styles.name}>{playerInfo?.username}</div>
          </div>
          <Menu
            mode="inline"
            items={[
              {
                label: (
                  <Link to="/personal/myaccount">
                    <User />
                    {intl.$t({ id: "PERSONAL_TAB_1" })}
                  </Link>
                ),
                key: "/personal/myaccount",
              },
              {
                label: (
                  <Link to="/personal/depositwithdraw">
                    <AcCharge />
                    {intl.$t({ id: "PERSONAL_TAB_2" })}
                  </Link>
                ),
                key: "/personal/depositwithdraw",
              },
              {
                label: (
                  <Link to="/personal/rewards">
                    <AcDiscount />
                    {intl.$t({ id: "PERSONAL_TAB_3" })}
                  </Link>
                ),
                key: "/personal/rewards",
              },
              {
                label: (
                  <Link to="/personal/settings">
                    <AcSetting />
                    {intl.$t({ id: "PERSONAL_TAB_4" })}
                  </Link>
                ),
                key: "/personal/settings",
              },
              {
                label: (
                  <Link to="/personal/privatemessage">
                    <AcAlarm />
                    {intl.$t({ id: "PERSONAL_TAB_5" })}
                  </Link>
                ),
                key: "/personal/privatemessage",
              },
              {
                label: (
                  <Link to="/personal/invitefriends">
                    <AcInvitefriend />
                    {intl.$t({ id: "PERSONAL_TAB_6" })}
                  </Link>
                ),
                key: "/personal/invitefriends",
              },
            ]}
            onClick={(e) => console.log("click ", e)}
            defaultKey={location?.pathname || "/personal/myaccount"}
          />
          <Button
            className={styles.logout}
            onClick={() => {
              dispatch(removeToken());
              navigate("/");
            }}>
            {intl.$t({ id: "PERSONAL_LOGOUT" })}
          </Button>
        </div>
        <div className={styles.right}>
          <Outlet userInfo={playerInfo} />
        </div>
      </div>
    </div>
  );

  const personalMb = () => (
    <div className={styles.personalMb}>
      <div className={styles.content}>
        {isLogin ? (
          <>
            <div className={styles.header}>
              <div className={styles.img}>
                <Img
                  src={
                    vipMenu[
                      playerInfo && playerInfo.group?.name
                        ? playerInfo.group.name
                        : "VIP10"
                    ]
                  }
                />
              </div>

              <div className={styles.username}>{playerInfo?.username}</div>
            </div>
            <div className={styles.wallet}>
              <div className={styles.left}>
                <div className={styles.num}>
                  <Cash />
                  {`$${toFixed2(balance)}`}
                </div>
                <div className={styles.text}>
                  {intl.$t({ id: "PERSON_CASH_WALLET" })}
                </div>
              </div>
              <div className={styles.right}>
                <Button
                  onClick={() => navigate("/depositwithdraw")}
                  className={styles.button}>
                  Deposit
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.logo}>
              <Img src={logo} />
            </div>
            <Button
              className={styles.login_button}
              onClick={() =>
                dispatch(onChange({ current: "login", visibleAuthModal: true }))
              }>
              {intl.$t({ id: "REGISTER_AND_LOGIN" })}
            </Button>
          </>
        )}

        <div className={styles.link}>
          {[
            {
              icon: <User />,
              path: "/myaccount",
              name: intl.$t({ id: "PERSONAL_TAB_1" }),
            },
            {
              icon: <AcCharge />,
              path: "/depositwithdraw",
              name: intl.$t({ id: "PERSONAL_TAB_2" }),
            },
            {
              icon: <AcDiscount />,
              path: "/rewards",
              name: intl.$t({ id: "PERSONAL_TAB_3" }),
            },
            {
              icon: <AcSetting />,
              path: "/settings",
              name: intl.$t({ id: "PERSONAL_TAB_4" }),
            },
            {
              icon: <AcAlarm />,
              path: "/privatemessage",
              name: intl.$t({ id: "PERSONAL_TAB_5" }),
            },
            {
              icon: <AcInvitefriend />,
              path: "/invitefriends",
              name: intl.$t({ id: "PERSONAL_TAB_6" }),
            },
          ].map((item, index) => (
            // <div className={styles.link_item} key={index}>
            <NewLink
              to={item.path}
              isTarget={false}
              className={styles.link_item}
              key={index}>
              <div className={styles.left}>
                {item.icon}
                {item.name}
              </div>

              <div className={styles.arrow}>
                <Back />
              </div>
            </NewLink>
            // </div>
          ))}
        </div>
        {isLogin && (
          <div className={styles.logout}>
            <Button
              className={styles.button}
              onClick={() => {
                dispatch(removeToken());
                !isMobile() && navigate("/");
              }}>
              {intl.$t({ id: "PERSONAL_LOGOUT" })}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
  return isMobile() ? personalMb() : personalPc();
};

export default Index;
