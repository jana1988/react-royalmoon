import { useEffect, useState } from "react";
import styles from "./index.less";
import { getGames, getGameTypes, getRTP } from "@/services/game";
import { Search, Favourite } from "@/components/Ui/Icon";
import { isMobile, gameApiNameReplace } from "@/utils";
import SearchBox from "@/components/SearchBox";
import {
  Select,
  RadioGroup,
  Radio,
  Pagination,
  Card,
  PaginationMb,
  CardLoad,
  Empty,
} from "@/components/Ui";
import { useIntl, FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { providerList as LiveproviderList } from "@/pages/Live/constant";
import pubsub from "pubsub-js";
import { iconGameProviders } from "@/common/constant";

export default () => {
  const { currency } = useSelector((state) => state.auth);
  const intl = useIntl();

  const [games, setGames] = useState([]); // 遊戲列表
  const [gamesRTP, setGamesRTP] = useState([]); // 遊戲列表

  const [visibleSearchBox, setVisibleSearchBox] = useState(false);
  const [visibleRtp, setVisibleRtp] = useState(false);

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

  useEffect(() => {
    setProviderList((pre) => {
      pre[0] = {
        label: intl.$t({ id: "ALL_PROVIDERS" }),
        value: 0,
      };
      return pre;
    });
  }, [intl.locale]);
  const fetchGameTypes = async () => {
    const res = await getGameTypes();
    if (!res?.length) return;
    const gameType = res.find(({ id }) => id === 1);
    if (gameType?.gameApis.length) {
      const list = gameType.gameApis.map((item) => ({
        label: gameApiNameReplace(item.name),
        value: item.id,
      }));
      setProviderList([...providerList, ...list, ...LiveproviderList]);
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
  const fetchRTP = async () => {
    const list = await fetchGames();
    const rtp = await getRTP({ list });
    if (Array.isArray(rtp)) {
      setGamesRTP((games) => games.concat(rtp));
    }
  };

  useEffect(() => {
    fetchGameTypes();
  }, [intl.locale]);

  useEffect(() => {
    fetchRTP();
  }, [objPage.page, provider, intl.locale, currency]);

  useEffect(() => {
    let _pubsub = pubsub.subscribe("games", (_, res) => {
      setTimeout(fetchGames, 3000);
    });
    return () => {
      pubsub.unsubscribe(_pubsub);
    };
  }, []);

  if (!isMobile()) {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [objPage.page]);
  }

  useEffect(() => {
    setGames(gamesRTP);
  }, [gamesRTP]);

  const handleProviderChange = (value) => {
    init();
    setProvider(value);
  };

  const providerLabel = providerList.find(
    (item) => item.value === provider,
  )?.label;

  const init = () => {
    setGames([]);
    setGamesRTP([]);
    setVisibleRtp(false);
    setObjPage({ ...objPage, page: 1 });
  };

  const renderCards = () =>
    games.map((item, index) => (
      <Card
        key={index}
        src={item.gameImgUrl}
        title={item.gameName}
        desc={gameApiNameReplace(item.gameApiName)}
        item={item}
        isRtpModal={true}
      />
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
        {isMobile() ? (
          isGamesLoading && objPage.page === 1 ? (
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
          )
        ) : isGamesLoading ? (
          <div className={styles.content}>{renderCardLoads()}</div>
        ) : games.length ? (
          <>
            <div className={styles.content}>{renderCards()}</div>
            <div className={styles.pagination}>
              <Pagination
                current={objPage.page}
                pageSize={objPage.limit}
                total={objPage.total}
                onChange={(page, limit) => {
                  setObjPage({ page, limit });
                }}
              />
            </div>
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
