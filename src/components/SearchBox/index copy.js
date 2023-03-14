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
import { isMobile, getGameUrl } from "@/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { getGames } from "@/services/game";
import { debounce, forEach } from "lodash";
import { useIntl } from "react-intl";
import LazyLoading from "@/components/LazyLoading";

const Index = (props) => {
  const intl = useIntl();
  const { visible, onClose } = props;

  const [games, setGames] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const contentRef = useRef(null);

  const fetchGames = async (gameName = "") => {
    setLoading(true);
    const config = {
      limit: 10,
    };
    if (gameName) config.gameName = gameName;
    const res = await getGames(config);
    setGames(res.list);
    setLoading(false);
    setTimeout(() => {
      const imgs0 = contentRef?.current?.getElementsByTagName("img")[0];
      if (imgs0) {
        imgs0.setAttribute(
          "src",
          "https://agstatic.com/games/pragmaticplay/spin_n_score_megaways.jpg",
        );
        imgs0.onload = function (e) {
          console.log(111111111, e);
          console.log(imgs0, 9999999);
        };
      }
    }, 0);
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
      fetchGames();

      const imgs0 = contentRef?.current?.getElementsByTagName("img")[0];
      if (imgs0) {
        imgs0.setAttribute(
          "src",
          "https://agstatic.com/games/pragmaticplay/spin_n_score_megaways.jpg",
        );
        imgs0.onload = function (e) {
          console.log(111111111, e);
          console.log(imgs0, 9999999);
        };
      }
      // console.log(11111111, imgs0);

      // const imgs = contentRef?.current?.getElementsByTagName("img") || [];
      // if (imgs.length) {
      //   imgs.forEach((img, index) => {
      //     console.log(111, img.getAttribute("data-img"));
      //     // console.log(333, img.dataset.img);
      //     // img.src = img.dataset.img;
      //     img.src =
      //       "https://agstatic.com/games/pragmaticplay/spin_n_score_megaways.jpg";
      //     // img.setAttribute("src", img.getAttribute("data-img"));

      //     // img.setAttribute("data-index", `${index}`);
      //     img.onload = function (e) {
      //       // img.setAttribute("src", img.getAttribute("data-img"));
      //       // img.src =
      //       // console.log(22222222, e);
      //       // img.removeAttribute("data-img");
      //     };
      //     // console.log(1111111, img);
      //   });
      // }
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
      <div className={styles.content} ref={contentRef}>
        {games.map((item, index) => (
          <img data-img={item.gameImgUrl} key={index} />
          // <LazyLoading>
          // <Card
          //   // src={item.gameImgUrl}
          //   title={item.gameName}
          //   desc={item.gameApiCode.replace("SoftGamings", "")}
          //   className={styles.card}
          //   to={getGameUrl({
          //     gameApiCode: item.gameApiCode,
          //     gameCode: item.gameCode,
          //     gameApiId: item.gameApiId,
          //     gameName: item.gameName,
          //   })}
          //   key={index}
          // />
          // </LazyLoading>
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
