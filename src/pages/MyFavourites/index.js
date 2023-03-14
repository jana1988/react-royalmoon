import { useEffect, useState } from "react";
import styles from "./index.less";
import {
  getGames,
  getGameTypes,
  getRTP,
  getClassRTPRank,
} from "@/services/game";
import { Search, Favourite } from "@/components/Ui/Icon";
import { isMobile, sortFirstString, gameApiNameReplace } from "@/utils";
import SearchBox from "@/components/SearchBox";
import {
  Select,
  RadioGroup,
  Radio,
  Card,
  PaginationMb,
  CardLoad,
  Empty,
} from "@/components/Ui";
import { useIntl, FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { iconGameProviders } from "@/common/constant";
import { throttle } from "lodash";
// import { cancel } from "@/helpers/requestTJ";
export default () => {
  const { currency } = useSelector((state) => state.auth);
  const intl = useIntl();
  const location = useLocation();
  const locationState = location.state || {};

  const [games, setGames] = useState([]); // 遊戲列表
  const [gamesRTP, setGamesRTP] = useState([]); // 遊戲列表

  const [visibleSearchBox, setVisibleSearchBox] = useState(false);
  const [visibleRtp, setVisibleRtp] = useState(false);

  const [gameTypeId, setGameTypeId] = useState(
    locationState.gameTypeId || null,
  );
  const [featured, setFeatured] = useState(
    typeof locationState.featured === "boolean" &&
      locationState.featured === false
      ? false
      : true,
  );
  const [isGamesLoading, setIsGamesLoading] = useState(false);
  const [objPage, setObjPage] = useState({
    page: 1,
    limit: 30,
    total: 0,
  });

  // 目前選擇的遊戲商
  const [provider, setProvider] = useState(0);

  // 所有遊戲商
  const [providerList, setProviderList] = useState([]);

  const [current, setCurrent] = useState({});

  const [navIndex, setNavIndex] = useState(locationState.index * 1 || 1);

  const [categoryCode, setCategoryCode] = useState(0);

  const fetchGameTypes = async () => {
    const res = await getGameTypes();
    if (!res?.length) return;
    const gameType = res.find(({ id }) => id === 1);
    if (gameType?.gameApis.length) {
      const list = gameType.gameApis.map((item) => ({
        label: gameApiNameReplace(item.name),
        value: item.id,
      }));
      setProviderList([
        ...providerList,
        ...sortFirstString(list, [30, 31, 91]),
      ]);
    }
  };

  const fetchGames = async () => {
    const config = { favorite: true };
    if (provider) config.gameApiId = provider;
    if (currency) {
      setIsGamesLoading(true);
      let res = await getGames({ ...config, ...objPage });

      setIsGamesLoading(false);
      if (Array.isArray(res?.list)) {
        setGames((games) => games.concat(res.list));
        setObjPage({ ...objPage, total: res.total });
        return res?.list;
      }
    }
  };

  const fetchGetClassRTPRank = async () => {
    const config = { categoryCode };
    if (featured && gameTypeId !== 15) config.featured = 1;
    if (gameTypeId) config.gameTypeId = gameTypeId;
    if (provider) config.gameApiId = provider;
    if (currency) {
      setIsGamesLoading(true);
      let res = await getClassRTPRank({
        ...config,
        page: objPage.page,
        limit: objPage.limit,
      });

      setIsGamesLoading(false);
      if (Array.isArray(res?.list)) {
        setGames((games) => games.concat(res.list));
        setObjPage({ ...objPage, total: res.total });
      }
    }
  };

  const fetchRTP = async () => {
    const list = await fetchGames();
    const rtp = await getRTP({ list });
    if (Array.isArray(rtp)) {
      setGamesRTP((games) => games.concat(rtp));
    }
  };

  const onScroll = () => {
    const _scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (_scrollTop > 0) {
      setVisibleRtp(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", throttle(onScroll, 500));
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setProviderList((pre) => {
      pre[0] = {
        label: intl.$t({ id: "ALL_PROVIDERS" }),
        value: 0,
      };
      return pre;
    });
    fetchGameTypes();
  }, [intl.locale]);

  useEffect(() => {
    if (navIndex === 1) {
      fetchRTP();
    } else if (navIndex === 2) {
      fetchGetClassRTPRank();
    }
  }, [
    featured,
    objPage.page,
    provider,
    gameTypeId,
    intl.locale,
    currency,
    navIndex,
    categoryCode,
  ]);

  useEffect(() => {
    setGames(gamesRTP);
  }, [gamesRTP]);

  const init = () => {
    setGames([]);
    setGamesRTP([]);
    setVisibleRtp(false);
    setObjPage({ ...objPage, page: 1 });
  };

  const handleProviderChange = (value) => {
    init();
    setProvider(value);
    setGameTypeId(1);
    setFeatured(false);
  };

  const providerLabel = providerList.find(
    (item) => item.value === provider,
  )?.label;

  const renderCards = () =>
    games.map((item, index) => (
      <Card
        key={index}
        src={item.gameImgUrl}
        title={item.gameName}
        desc={gameApiNameReplace(item.gameApiName)}
        item={{ ...item, index }}
        isRtpModal={true}
        index={index}
        onClickRtp={(item) => {
          setCurrent(item);
          if (visibleRtp && current.index === item.index) {
            setVisibleRtp(false);
          } else {
            setVisibleRtp(true);
          }
        }}
        isRtp={navIndex === 2 && true}
        visibleRtp={current.index === index && visibleRtp}></Card>
    ));

  const renderCardLoads = () =>
    new Array(30).fill("").map((item, index) => <CardLoad key={index} />);

  return (
    <div className={styles.slots}>
      <div className={styles.nav}>
        <div className={styles.left}>
          <div className={`${styles.text} ${styles.active}`}>
            <Favourite />
            <FormattedMessage id="MY_FAVOURITES" />
          </div>
        </div>
        <div className={styles.right}>
          <Select text={providerLabel} buttonClassName={styles.selectButton}>
            <RadioGroup onChange={handleProviderChange}>
              {providerList.map((item, index) => (
                <Radio
                  key={index}
                  value={item.value}
                  icon={iconGameProviders[item.value] || iconGameProviders[0]}
                  checked={provider === item.value}>
                  {item.label}
                </Radio>
              ))}
            </RadioGroup>
          </Select>

          <div
            className={styles.search}
            onClick={() => {
              setVisibleSearchBox(true);
            }}>
            {!isMobile() && (
              <input
                className={styles.input}
                placeholder={intl.$t({ id: "SEARCH" })}
                disabled
              />
            )}
            <button className={styles.icon}>
              <Search />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.main}>
        {isGamesLoading && objPage.page === 1 ? (
          <div className={styles.content}>{renderCardLoads()}</div>
        ) : games.length ? (
          <>
            <div className={styles.content}>{renderCards()}</div>
            <PaginationMb
              loading={isGamesLoading}
              text={intl.$t({ id: "PROMOTIONS_BUTTON" })}
              objPage={objPage}
              onClick={() => {
                setObjPage({ ...objPage, page: objPage.page + 1 });
              }}
            />
          </>
        ) : (
          <Empty className={styles.empty} />
        )}
      </div>
      <SearchBox
        visible={visibleSearchBox}
        onClose={() => {
          setVisibleSearchBox(false);
        }}
      />
    </div>
  );
};
