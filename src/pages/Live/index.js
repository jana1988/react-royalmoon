import styles from "./index.less";
import { getGames, getGameList, getGameTypes } from "@/services/game";
import { useEffect, useState } from "react";
import { Livecasino, Search } from "@/components/Ui/Icon";
import {
  isMobile,
  srotGameByIds,
  sortFirstString,
  gameApiNameReplace,
} from "@/utils";
import {
  Button,
  Select,
  RadioGroup,
  Radio,
  Card,
  PaginationMb,
  CardLoad,
  Empty,
} from "@/components/Ui";
import { useIntl } from "react-intl";
import SearchBox from "@/components/SearchBox";
import { gameTypes } from "./constant";
import { useSelector } from "react-redux";
import { iconGameProviders } from "@/common/constant";

export default () => {
  const intl = useIntl();
  const { currency } = useSelector((state) => state.auth);

  const [visibleSearchBox, setVisibleSearchBox] = useState(false);
  const [gameTypeId, setGameTypeId] = useState(null);
  const [games, setGames] = useState([]); // 遊戲列表
  const [isGamesLoading, setIsGamesLoading] = useState(false);

  const [objPage, setObjPage] = useState({
    page: 1,
    limit: 30,
    total: 0,
  });
  const [featured, setFeatured] = useState(true);

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
    const gameType = res.find(({ id }) => id === 11);
    if (gameType?.gameApis.length) {
      const list = gameType.gameApis.map((item) => ({
        label: gameApiNameReplace(item.name),
        value: item.id,
      }));
      setProviderList([
        ...providerList,
        ...sortFirstString(list, [25, 21, 28, 37]),
      ]);
    }
  };

  const fetchGames = async (search = "") => {
    const config = {};
    if (gameTypeId) config.gameTypeId = gameTypeId;
    if (search) config.gameName = search;
    if (provider) config.gameApiId = provider;
    if (currency) {
      setIsGamesLoading(true);
      let res = await getGames({ ...config, ...objPage });
      setIsGamesLoading(false);

      if (Array.isArray(res?.list)) {
        setGames((games) => games.concat(res.list));
        setObjPage({ ...objPage, total: res.total });
      }
    }
  };

  const fetchGamesPopular = async () => {
    if (currency) {
      setIsGamesLoading(true);
      const res = await getGameList({
        gameApiGameCode: [
          {
            gameApiCode: "SoftGamingsEvolution",
            gameCodes: [
              "104",
              "108",
              "105",
              "baccarat_sicbo",
              "lightningscalablebj",
              "sicbo",
              "dragontiger",
              "americanroulette",
              "tcp",
              "baccarat",
            ],
          },
          {
            gameApiCode: "SoftGamingsAsiaGaming",
            gameCodes: [
              "32",
              "33",
              "C001",
              "C002",
              "C006",
              "C010",
              "C015",
              "B001",
              "24",
              "1",
            ],
          },
          {
            gameApiCode: "SoftGamingsPragmaticPlayLive",
            gameCodes: ["303", "103", "104", "401", "402"],
          },
          {
            gameApiCode: "SoftGamingsEzugi",
            gameCodes: [
              "selectGame:baccarat",
              "openTable:170",
              "openTable:130",
              "openTable:100",
              "selectGame:blackjack",
              "openTable:426",
              "openTable:425",
              "openTable:1",
              "openTable:227",
            ],
          },
          // {
          //   gameApiCode: "SoftGamingsSAGaming",
          //   gameCodes: ["844", "842", "843", "830", "851"],
          // },
        ],
        page: 1,
        limit: 30,
      });
      setIsGamesLoading(false);

      if (Array.isArray(res?.list)) {
        setGames(srotGameByIds(res.list, [25], true));
        setObjPage({ ...objPage, total: res.total });
      }
    }
  };

  useEffect(() => {
    fetchGameTypes();
  }, []);

  useEffect(() => {
    if (featured) {
      fetchGamesPopular();
    } else {
      fetchGames();
    }
  }, [featured, objPage.page, provider, gameTypeId, intl.locale, currency]);

  const handleProviderChange = (value) => {
    setGames([]);
    if (featured) {
      setGameTypeId(11);
      setFeatured(false);
    }
    setProvider(value);
    setObjPage({ ...objPage, page: 1 });
  };
  const handleGameTypeIdChange = (id) => {
    if (typeof id === "boolean") {
      setFeatured(id);
      setGameTypeId(null);
      setProvider(0);
    } else {
      setFeatured(false);
      setGameTypeId(id);
    }
    setGames([]);
    setObjPage({ ...objPage, page: 1 });
  };

  const providerLabel = providerList.find(
    (item) => item.value === provider,
  )?.label;

  const renderCardLoads = () =>
    new Array(30).fill("").map((item, index) => <CardLoad key={index} />);

  const renderCards = () =>
    games.map((item, index) => (
      <Card
        key={index}
        src={item.gameImgUrl}
        title={item.gameName}
        desc={gameApiNameReplace(item.gameApiName)}
        item={item}
      />
    ));
  return (
    <div className={styles.live}>
      <div className={styles.nav}>
        <div className={styles.left}>
          <div className={`${styles[`text_${intl.locale}`]}`}>
            <Livecasino />
            {intl.$t({ id: "LIVE_CASINO" })}
          </div>
        </div>
        <div className={styles.right}>
          <Select text={providerLabel} buttonClassName={styles.selectButton}>
            <RadioGroup onChange={handleProviderChange}>
              {providerList.map((item) => (
                <Radio
                  key={item.label}
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
      <div className={styles.labels}>
        {gameTypes.map((item) => (
          <Button
            key={item.id}
            className={`${styles.label} ${
              (item.id === featured || item.id === gameTypeId) && styles.active
            }`}
            onClick={() => {
              if (item.id === gameTypeId || item.id === featured) {
                return;
              }
              handleGameTypeIdChange(item.id);
            }}>
            {item.title}
          </Button>
        ))}
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
