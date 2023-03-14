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
import useGuard from "@/hooks/useGuard";
import { isMobile, getClientHeight } from "@/utils";
import { useIntl } from "react-intl";

export default () => {
  useGuard();
  const intl = useIntl();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const iframeRef = useRef(null);

  const [launchGameUrl, setLaunchGameUrl] = useState("");

  const fetchLaunchGame = async () => {
    const config = {
      gameCode: search.get("gameCode"),
      gameApiId: search.get("gameApiId"),
    };
    const link = await launchGame(config);
    if (typeof link === "string") {
      setLaunchGameUrl(link);
    }
  };

  useEffect(() => {
    fetchLaunchGame();
  }, [intl.locale]);

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
        {launchGameUrl && (
          <>
            <iframe
              ref={iframeRef}
              className={styles.iframe}
              src={launchGameUrl}></iframe>
            <button className={styles.fullscreen} onClick={handleFullscreen}>
              <Fullscreen />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
