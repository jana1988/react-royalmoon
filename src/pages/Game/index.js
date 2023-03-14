import styles from "./index.less";
import { Fullscreen } from "@/components/Ui/Icon/index";
import { launchGame } from "@/services/game";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  isFullscreenSupport,
  fullscreenFn,
  isElFullscreen,
  exitFullscreenFn,
} from "@/utils/fullscreen";
import { useDispatch, useSelector } from "react-redux";
import { onChange } from "@/store/reducer/authSlice";
import { useIntl } from "react-intl";
import { isMobile, getClientHeight } from "@/utils";

export default () => {
  const { isLogin } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const intl = useIntl();

  const search = new URLSearchParams(location.search);
  const iframeRef = useRef(null);
  const links = {
    worldcup: `https://worldcup.royalmoon.io`,
    raffle: `https://giveaway.royalmoon.io`,
    // worldcup: "https://worldcup.juwang999.com/world-cup",
    // raffle: "https://treasurehunt.juwang999.com",
  };

  const [launchGameUrl, setLaunchGameUrl] = useState("");

  const listenMessage = (state) => {
    if (state.data.showLogin) {
      dispatch(onChange({ current: "login", visibleAuthModal: true }));
    }
  };

  const fetchLaunchGame = async () => {
    const config = {
      gameCode: search.get("gameCode"),
      gameApiId: search.get("gameApiId"),
    };
    const link = await launchGame(config);
    if (link) {
      setLaunchGameUrl(link);
    }
  };

  useEffect(() => {
    if (isLogin) {
      fetchLaunchGame();
    } else {
      setLaunchGameUrl(
        `${links[search.get("gameCode") || "raffle"]}?lang=${intl.locale}`,
      );
    }
  }, [isLogin, search.get("gameCode"), search.get("gameApiId"), intl.locale]);

  useEffect(() => {
    window.addEventListener("message", listenMessage);
    return () => {
      window.removeEventListener("message", listenMessage);
    };
  }, []);

  const handleFullscreen = () => {
    const el = iframeRef.current;
    if (!isFullscreenSupport(el)) return;
    isElFullscreen(el) ? exitFullscreenFn(el) : fullscreenFn(el);
  };

  const _styles = () => {
    const style = {};
    if (isMobile()) {
      style.height = `calc(${getClientHeight()}px - 16vw)`;
    }
    return style;
  };

  return (
    <div className={styles.container}>
      <div className={styles.game} style={{ ..._styles() }}>
        <iframe
          ref={iframeRef}
          className={styles.iframe}
          src={launchGameUrl}></iframe>
        <button className={styles.fullscreen} onClick={handleFullscreen}>
          <Fullscreen />
        </button>
      </div>
    </div>
  );
};
