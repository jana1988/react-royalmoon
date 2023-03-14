import styles from "./index.less";
import { Button, MenuMb, Img } from "@/components/Ui";
import {
  Search,
  SmallArrow,
  AcCharge,
  User,
  AcAlarm,
  Favourite,
} from "@/components/Ui/Icon";
import { isMobile, toFixed2 } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { onChoose } from "@/store/reducer/languageSlice";
import { onChange } from "@/store/reducer/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

import SearchBox from "@/components/SearchBox";
import NewLink from "@/components/Link";

import { getGames } from "@/services/game";
import { getLanguages } from "@/services/home";

import Flag_en from "@/assets/header/Flag_en.webp";
import flag_jp from "@/assets/header/flag_jp.webp";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { getWalletsById } from "@/services/myAccount";
import { getMessageList } from "@/services/privatemessage";
import { isArray } from "lodash";
import { menuMb, menuPc } from "./constant";
import usePageShow from "@/hooks/usePageShow";
import { logo } from "@/assets";

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language);

  const location = useLocation();
  const search = new URLSearchParams(location.search);

  const { isLogin } = useSelector((state) => state.auth);
  const [visibleLang, setVisibleLang] = useState(false);
  const [visibleSearchBox, setVisibleSearchBox] = useState(false);
  const [balance, setBalance] = useState(0);
  const [unRead, setUnRead] = useState(false);
  const timerRef = useRef();

  const [languages, setLanguages] = useState([
    { img: flag_jp, name: "日本語", lang: "ja", textName: "JA" },
    { img: Flag_en, name: "English", lang: "en", textName: "EN" },
  ]);

  const fetchUserInfo = async () => {
    const data = await getWalletsById(0);
    if (data) {
      setBalance(data.balance || 0);
    }
    const messageRes = await getMessageList();
    if (
      messageRes &&
      messageRes.length > 0 &&
      isArray(messageRes[0].messages)
    ) {
      const messageData = messageRes[0].messages;
      const unReadMessage = messageData.findIndex(
        (item) => item.read === false,
      );
      setUnRead(unReadMessage >= 0);
    }
  };

  const fetchLanguages = async () => {
    const data = await getLanguages();
    const _languages = [];
    data.forEach((element) => {
      if (element.indexOf("ja") != -1) {
        _languages.push({
          img: flag_jp,
          name: "日本語",
          lang: "ja",
          textName: "JA",
        });
      } else if (element.indexOf("en") != -1) {
        _languages.push({
          img: Flag_en,
          name: "English",
          lang: "en",
          textName: "EN",
        });
      }
    });
    setLanguages(_languages);
  };

  usePageShow(
    () => {
      timerRef.current && clearInterval(timerRef.current);
      if (isLogin) {
        fetchUserInfo();
        timerRef.current = setInterval(fetchUserInfo, 60 * 1000);
      }
    },
    {},
    true,
    isLogin,
  );

  useEffect(() => {
    fetchLanguages();
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (search.get("email") && search.get("otp")) {
      dispatch(onChange({ current: "login", visibleAuthModal: true }));
    }
    if (search.get("agentTrackingCode")) {
      localStorage.setItem(
        "agentTrackingCode",
        search.get("agentTrackingCode"),
      );
    }
    return () => {
      localStorage.removeItem("agentTrackingCode");
    };
  }, []);

  const renderUserInfo = () => {
    if (isLogin) {
      if (isMobile()) {
        return (
          <div className={styles.userInfo}>
            <AcCharge className={styles.balanceIcon} />
            <span className={styles.balance}>{`$${toFixed2(balance)}`}</span>
            <Link to={"/myaccount"}>
              <div className={styles.user}>
                <User />
              </div>
            </Link>
            <Link to={"/privatemessage"}>
              <div className={styles.alarm}>
                <AcAlarm />
                {unRead && <div className={styles.unread} />}
              </div>
            </Link>
          </div>
        );
      }
      return (
        <div className={styles.userInfo}>
          <AcCharge className={styles.balanceIcon} />
          <span className={styles.balance}>{`$${toFixed2(balance)}`}</span>
          <Link to={"/personal/myaccount"}>
            <div className={styles.user}>
              <User />
            </div>
          </Link>
          <Link to={"/personal/privatemessage"}>
            <div className={styles.alarm}>
              <AcAlarm />
              {unRead && <div className={styles.unread} />}
            </div>
          </Link>
          <Link to={"/personal/depositwithdraw"}>
            <Button className={styles.deposit}>
              <FormattedMessage id="DEPOSIT" />
            </Button>
          </Link>
        </div>
      );
    }
    return (
      <div className={styles.userInfo}>
        <Button
          onClick={() =>
            dispatch(onChange({ current: "login", visibleAuthModal: true }))
          }
          className={isMobile() ? styles.loginMb : styles.loginPc}>
          <span>
            <FormattedMessage id="LOGIN" />
          </span>
        </Button>
        <Button
          onClick={() =>
            dispatch(onChange({ current: "register", visibleAuthModal: true }))
          }
          className={isMobile() ? styles.signupMb : styles.signupPc}>
          <FormattedMessage id="REGISTER" />
        </Button>
      </div>
    );
  };

  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        {isMobile() ? (
          <div className={styles.menu}>
            <MenuMb
              items={menuMb}
              footer={() => (
                <div className={styles.lang}>
                  {languages.map((item, index) => (
                    <div
                      className={`${styles.item} ${
                        language.locale === item.lang && styles.active
                      }`}
                      key={index}
                      onClick={() => {
                        dispatch(
                          onChoose({ locale: item.lang, imgSrc: item.img }),
                        );
                        setVisibleLang(false);
                      }}>
                      <Img src={item.img} className={styles.img} />
                      <span className={styles.name}>{item.name}</span>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
        ) : (
          <div className={styles.nav}>
            {menuPc.map((item, index) => (
              <NewLink
                key={index}
                to={item[2]}
                isTarget={false}
                isIntercept={item[2].indexOf("/gamesport") !== -1}>
                <div
                  className={`${styles.name}  ${
                    `${location.pathname}${location.search}` === item[2] &&
                    styles.active
                  } `}>
                  {item[1]}
                  <span>{item[0]}</span>
                </div>
              </NewLink>
            ))}
          </div>
        )}
        <div
          className={styles.logo}
          onClick={() => {
            navigate("/");
          }}>
          <Img src={logo} alt="logo" />
        </div>

        <div className={styles.right}>
          {!isMobile() && (
            <>
              <NewLink to={"/myfavourites"} isTarget={false}>
                <div className={styles.favorite}>
                  <Favourite />
                </div>
              </NewLink>
              <div
                className={styles.search}
                onClick={() => {
                  setVisibleSearchBox(true);
                }}>
                <Search />
              </div>
            </>
          )}
          {
            <SearchBox
              visible={visibleSearchBox}
              onClose={() => {
                setVisibleSearchBox(false);
              }}
              fetchGames={getGames}
            />
          }

          {renderUserInfo()}

          {!isMobile() && (
            <div className={styles.lang}>
              <div
                className={styles.changeLang}
                onClick={() => setVisibleLang(!visibleLang)}>
                <Img src={language.imgSrc} />
                <span>{language.textName}</span>
                <div
                  className={styles.arrow}
                  style={{
                    transform: visibleLang ? "rotateX(180deg)" : "rotateX(0)",
                  }}>
                  <SmallArrow />
                </div>
              </div>
              {visibleLang && (
                <div className={styles.main}>
                  <div className={styles.triangle}></div>
                  <div className={styles.content}>
                    {languages.map((item, index) => (
                      <div
                        className={`${styles.item} ${
                          language.locale === item.lang && styles.active
                        }`}
                        key={index}
                        onClick={() => {
                          dispatch(
                            onChoose({
                              locale: item.lang,
                              imgSrc: item.img,
                              textName: item.textName,
                            }),
                          );
                          setVisibleLang(false);
                        }}>
                        <Img src={item.img} className={styles.img} />
                        <span className={styles.name}>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
