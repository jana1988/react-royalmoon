import styles from "./index.less";
import { Title, ReadMore } from "../";
import { Card, CardRtp, CardLoad } from "@/components/Ui";
import { isMobile } from "@/utils";
import { useNavigate } from "react-router-dom";
import Swiper from "@/components/Swiper";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
export default (props) => {
  const { rtp24 = {} } = props;
  const navigate = useNavigate();
  const [dataUp, setDataUp] = useState([]);
  const [dataDn, setDataDn] = useState([]);

  const dealData = () => {
    const dataUp = rtp24?.up
      ?.map((item) => ({
        ...item,
        renderItem,
      }))
      ?.sort((a, b) => b.dailyRTP - a.dailyRTP);
    const dataDn = rtp24?.dn
      ?.map((item) => ({
        ...item,
        renderItem,
      }))
      ?.sort((a, b) => a.dailyRTP - b.dailyRTP);

    setDataUp(dataUp);
    setDataDn(dataDn);
  };

  useEffect(() => {
    dealData();
  }, [rtp24]);

  const renderReadMore = () => (
    <ReadMore
      onClick={() => {
        navigate("/slots", { state: { index: 2 } });
      }}>
      <FormattedMessage id="READ_MORE" />
    </ReadMore>
  );

  const renderItem = (item) => (
    <Card
      src={item.gameImgUrl}
      className={styles.card}
      item={item}
      isRtp={true}>
      <CardRtp rtp={item.rtp} timeRtp={item.dailyRTP} />
    </Card>
  );

  const renderCardLoads = () => (
    <div className={styles.card_loading}>
      {new Array(isMobile() ? 6 : 12).fill("").map((item, index) => (
        <CardLoad key={index} />
      ))}
    </div>
  );

  const renderUp = () => (
    <div className={styles.swiperWarpperUp}>
      <Swiper
        slidesPerGroup={isMobile() ? 3 : 6}
        slidesPerView={"auto"}
        data={dataUp}
        classNavigation={styles.navigation}
        loopedSlides={18}
        swiperContainer="renderRtpUp"
      />
    </div>
  );

  const renderDn = () => (
    <div className={styles.swiperWarpperDn}>
      <Swiper
        slidesPerGroup={isMobile() ? 3 : 6}
        slidesPerView={"auto"}
        data={dataDn}
        classNavigation={styles.navigation}
        loopedSlides={18}
        swiperContainer="renderRtpDn"
      />
    </div>
  );

  return (
    <div className={styles.rtp}>
      <div className={styles.content}>
        <Title>
          <FormattedMessage id="LIVE_RTP" />
        </Title>
        <div className={styles.box}>
          {dataUp?.length ? (
            <>
              {renderUp()}
              {renderDn()}
            </>
          ) : (
            renderCardLoads()
          )}
        </div>
        {renderReadMore()}
      </div>
    </div>
  );
};
