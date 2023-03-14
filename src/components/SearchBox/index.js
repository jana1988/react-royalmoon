import {
  Modal,
  Input,
  PopupMb,
  Toast,
  Card,
  CardLoad,
  Empty,
} from "@/components/Ui";
import styles from "./index.less";
import { isMobile, gameApiNameReplace } from "@/utils";
import { useCallback, useEffect, useState } from "react";
import { getGames, getGameList } from "@/services/game";
import { debounce } from "lodash";
import { useIntl } from "react-intl";
import LazyLoading from "@/components/LazyLoading";

const Index = (props) => {
  const intl = useIntl();
  const { visible, onClose } = props;

  const [games, setGames] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchGames = async (gameName = "") => {
    setLoading(true);
    const config = {
      limit: 200,
    };
    if (gameName) config.gameName = gameName;
    const res = await getGames(config);
    setGames(res.list);
    setLoading(false);
  };

  const fetchGamesPopular = async () => {
    setLoading(true);
    const resSlots = await getGames({
      limit: 30,
      featured: true,
    });
    const resLive = await getGameList({
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
      ],
      page: 1,
      limit: 30,
    });
    setGames([...resSlots.list, ...resLive.list]);
    setLoading(false);
  };

  const handleSearch = useCallback(
    debounce((val) => {
      if (val.length > 0 && val.length < 2) {
        Toast.info("Please type in 2 characters at least.");
        return;
      }
      fetchGames(val);
    }, 1000),
    [],
  );

  useEffect(() => {
    if (visible) {
      fetchGamesPopular();
    }
  }, [visible]);

  const onSearch = (e) => {
    setSearchValue(e.target.value);
    handleSearch(e.target.value);
  };

  const _onClose = () => {
    setSearchValue("");
    onClose();
  };

  const renderContent = () =>
    loading ? (
      <div className={styles.content}>
        {new Array(20).fill("").map((item, index) => (
          <CardLoad key={index} className={styles.card} />
        ))}
      </div>
    ) : games.length > 0 ? (
      <div className={styles.content}>
        {games.map((item, index) => (
          <LazyLoading key={index}>
            <Card
              src={item.gameImgUrl}
              title={item.gameName}
              desc={gameApiNameReplace(item.gameApiName)}
              className={styles.card}
              item={item}
            />
          </LazyLoading>
        ))}
      </div>
    ) : (
      <Empty className={styles.empty} />
    );

  const renderPc = () => (
    <Modal
      visible={visible}
      title={intl.$t({ id: "SEARCH_GAME" })}
      onCancel={_onClose}
      showFooter={false}>
      <div className={styles.search_box}>
        <Input
          placeholder={intl.$t({ id: "SEARCH_4_GAMES" })}
          onChange={onSearch}
          value={searchValue}
        />
        {renderContent()}
      </div>
    </Modal>
  );
  const renderMb = () => (
    <PopupMb
      visible={visible}
      title={intl.$t({ id: "SEARCH_GAME" })}
      onClose={_onClose}>
      <div className={styles.search_box}>
        <Input
          placeholder={intl.$t({ id: "SEARCH_4_GAMES" })}
          value={searchValue}
          onChange={onSearch}
          className={styles.input}
        />
        {renderContent()}
      </div>
    </PopupMb>
  );
  return isMobile() ? renderMb() : renderPc();
};

export default Index;
