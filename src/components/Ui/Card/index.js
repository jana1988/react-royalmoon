import "./index.less";

import { Img, Favourite } from "@/components/Ui";
import { Link, Rtp, Animation } from "@/components";
import { getGameUrl, isMobile } from "@/utils";
import { hover_video } from "@/assets/home";
import { Info } from "@/components/Ui/Icon";
import useHover from "@/hooks/useHover";
import { stylePxToVw } from "@/utils";

const Index = (props) => {
  const [hoverRef, isHovered] = useHover();
  const [animationHoverRef, isAnimationHovered] = useHover();

  const {
    src = "",
    title = "",
    desc = "",
    onClick = null,
    className = "",
    children = null,
    isTarget = true,
    isShowFavourite = true,
    item = {},
    isRtpModal = false,
    onClickRtp = null,
    visibleRtp = false,
  } = props;

  return (
    <div className={`_card ${className}`} onClick={onClick}>
      {src && (
        <Link
          to={getGameUrl({
            gameApiCode: item.gameApiCode,
            gameCode: item.gameCode,
            gameApiId: item.gameApiId,
            gameName: item.gameName,
            favorite: item.favorite,
            gameApiName: item.gameApiName,
          })}
          isTarget={isTarget}>
          <div className={`_card_src`} ref={animationHoverRef}>
            <Img className={"_card_src_img"} src={src} />
            <Animation.Games isHovered={!isMobile() && isAnimationHovered} />
            {isShowFavourite && (
              <div className={`_card_favourite`}>
                <Favourite
                  favorite={item.favorite}
                  gameCode={item.gameCode}
                  gameApiId={item.gameApiId}
                />
              </div>
            )}
          </div>
        </Link>
      )}
      {title && <div className={`_card_title`}>{title}</div>}
      {desc && (
        <div className={`_card_desc`}>
          <div className={`_card_desc_left`}>{desc}</div>
          <div className={`_card_desc_right`}>
            {isRtpModal && (
              <div
                className={`_card_rtp`}
                ref={hoverRef}
                onClick={() => onClickRtp(item)}>
                <div className={`_card_rtp_info`}>
                  <Info />
                </div>

                <Rtp
                  rtp={item.rtp}
                  dailyRTP={item.dailyRTP}
                  weekRTP={item.weekRTP}
                  monthRTP={item.monthRTP}
                  biggest_win={item.biggest_win}
                  isHovered={!isMobile() && isHovered}
                  visible={visibleRtp}
                  style={
                    isMobile() && item.index % 2 == 1
                      ? {
                          left: stylePxToVw(-550),
                        }
                      : {}
                  }
                />
              </div>
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Index;
