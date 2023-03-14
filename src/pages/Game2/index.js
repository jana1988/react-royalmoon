import styles from "./index.less";
import { Fullscreen } from "@/components/Ui/Icon/index";
import { launchGame2, getGameList } from "@/services/game";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  isFullscreenSupport,
  fullscreenFn,
  isElFullscreen,
  exitFullscreenFn,
} from "@/utils/fullscreen";
import { useIntl } from "react-intl";
import { Card, Favourite } from "@/components/Ui";
import { isMobile, getClientHeight, gameApiNameReplace } from "@/utils";
import useGuard from "@/hooks/useGuard";
import { isHorizontal, isTarget } from "./constant";
import { useSelector } from "react-redux";
import { Animation } from "@/components";

export default () => {
  const { currency } = useSelector((state) => state.auth);

  useGuard();
  const intl = useIntl();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const iframeRef = useRef(null);
  const launchGameHtmlRef = useRef(null);

  const [launchGameUrl, setLaunchGameUrl] = useState("");
  const [launchGameHtml, setLaunchGameHtml] = useState("");
  const [loading, setLoading] = useState(false);

  const [games, setGames] = useState([]);

  const fetchLaunchGame = async () => {
    const config = {
      gameCode: search.get("gameCode"),
      gameApiId: search.get("gameApiId"),
    };
    if (isMobile()) {
      config.platform = "mobile";
    }
    let link;
    setLoading(true);
    try {
      link = await launchGame2(config);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    if (link.launchGameUrl) {
      if (isMobile() && isTarget(search.get("gameApiId"))) {
        window.location.replace(link.launchGameUrl);
        return;
      }
      setLaunchGameUrl(link.launchGameUrl);
    } else if (link.launchGameHtml) {
      setLaunchGameHtml(link.launchGameHtml);
      const slotHtml = document
        .createRange()
        .createContextualFragment(link.launchGameHtml);

      launchGameHtmlRef.current.innerHTML = ""; // Clear the container
      launchGameHtmlRef.current.appendChild(slotHtml); // Append the new content
      let egamings_container = document.getElementById("egamings_container");
      egamings_container.style.height = "100%";
      egamings_container.style.width = "100%";
    }
  };

  const fetchGames = async () => {
    if (currency) {
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
            gameApiCode: "SoftGamingsSAGaming",
            gameCodes: ["844", "842", "843", "830", "851"],
          },
        ],
        limit: 10,
      });
      if (Array.isArray(res?.list)) {
        setGames(res.list);
      }
    }
  };

  useEffect(() => {
    fetchLaunchGame();
    if (!isMobile()) {
      fetchGames();
    }
    if (
      isMobile() &&
      isHorizontal(
        search.get("gameApiId"),
        search.get("gameCode"),
        search.get("gameApiCode"),
      )
    ) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
  }, [search.get("gameCode"), search.get("gameApiId")]);

  const handleFullscreen = (el) => {
    if (!isFullscreenSupport(el)) return;
    isElFullscreen(el) ? exitFullscreenFn(el) : fullscreenFn(el);
  };

  const _styles = () => {
    const style = {};
    if (isMobile()) {
      if (
        isHorizontal(
          search.get("gameApiId"),
          search.get("gameCode"),
          search.get("gameApiCode"),
        )
      ) {
        style.width = getClientHeight() + "px";
        style.height = "100vw";
        // style.transform = "rotate(90deg) translateY(-100%)";
        // style.transformOrigin = " 0 0";
      } else {
        style.height = getClientHeight() + "px";
      }
      return style;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {!isMobile() && (
          <div className={styles.header}>
            <div className={styles.left}>
              <div className={styles.name}>{search.get("gameName")}</div>
              <div className={styles.desc}>
                {gameApiNameReplace(search.get("gameApiName"))}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.favorite}>
                <Favourite
                  favorite={Boolean(
                    JSON.parse(search.get("favorite") || "false"),
                  )}
                  gameCode={search.get("gameCode")}
                  gameApiId={search.get("gameApiId")}
                />
              </div>
              <button
                className={styles.fullscreen}
                onClick={() =>
                  handleFullscreen(
                    launchGameHtml
                      ? launchGameHtmlRef.current.getElementsByTagName(
                          "iframe",
                        )[0]
                      : iframeRef.current,
                  )
                }>
                <Fullscreen />
              </button>
            </div>
          </div>
        )}
        <div className={styles.wrap}>
          {loading && <Animation.Game2 />}

          <div
            style={{
              ..._styles(),
              display: `${launchGameHtml ? "block" : "none"}`,
            }}
            className={
              isMobile() &&
              isHorizontal(
                search.get("gameApiId"),
                search.get("gameCode"),
                search.get("gameApiCode"),
              )
                ? styles.gameRotate
                : styles.game
            }
            ref={launchGameHtmlRef}>
            <button
              className={styles.fullscreen}
              onClick={() => handleFullscreen(iframeRef.current)}>
              <Fullscreen />
            </button>
          </div>

          <div
            style={{
              ..._styles(),
              display: `${launchGameUrl ? "block" : "none"}`,
            }}
            className={
              isMobile() &&
              isHorizontal(
                search.get("gameApiId"),
                search.get("gameCode"),
                search.get("gameApiCode"),
              )
                ? styles.gameRotate
                : styles.game
            }>
            <iframe
              ref={iframeRef}
              className={styles.iframe}
              // src={"https://treasurehunt.juwang999.com"}
              src={launchGameUrl}
            />
          </div>
        </div>
      </div>
      {!isMobile() && (
        <div className={styles.hotGame}>
          <div className={styles.title}>{intl.$t({ id: "POPULAR_GAMES" })}</div>
          <div className={styles.list}>
            {games.map((item, index) => (
              <div className={styles.game} key={index}>
                <Card
                  src={item.gameImgUrl}
                  title={item.gameName}
                  desc={gameApiNameReplace(item.gameApiCode)}
                  className={styles.card}
                  isTarget={false}
                  item={item}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
