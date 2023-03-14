import styles from "./index.less";
import { Title, ReadMore } from "../";
import { Card, Img } from "@/components/Ui";
import Swiper from "@/components/Swiper";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { isMobile } from "@/utils";

import { hover_video } from "@/assets/home";

export default (props) => {
  const { popularSlots = [] } = props;
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const dealData = () => {
    const data = popularSlots.map((item) => ({
      ...item,
      renderItem,
    }));

    setData(data);
  };

  useEffect(() => {
    dealData();
  }, []);

  const renderPopularSlotsPc = () => (
    <div className={styles.popularSlots}>
      <div className={styles.content}>
        <Title>
          <FormattedMessage id="POPULAR_SLOTS" />
        </Title>
        <div className={styles.box}>
          <Swiper
            slidesPerGroup={isMobile() ? 3 : 5}
            slidesPerView={isMobile() ? 3 : "auto"}
            data={data.slice(0, 15)}
            classNavigation={styles.navigation}
            loopedSlides={5}
            swiperContainer="popularSlots"
          />
        </div>
      </div>
    </div>
  );

  const renderItem = (item) => (
    <Card className={styles.card} src={item.gameImgUrl} item={item} />
  );

  const renderPopularSlotsMb = () => (
    <div className={styles.popularSlotsMb}>
      <div className={styles.content}>
        <Title>
          <FormattedMessage id="POPULAR_SLOTS" />
        </Title>
        <div className={styles.cardWrapper}>
          {data.slice(0, 6).map((item, index) => (
            <Card
              src={item.gameImgUrl}
              key={index}
              className={styles.card}
              item={item}
            />
          ))}
        </div>
        <ReadMore onClick={() => navigate("/slots")}>
          <FormattedMessage id="READ_MORE" />
        </ReadMore>
      </div>
    </div>
  );

  const renderGame = () => (
    <div className={styles.game}>
      <div className={styles.content}>
        {popularSlots.slice(15, 27).map((item, index) => (
          <Card
            src={item.gameImgUrl}
            key={index}
            className={styles.card}
            item={item}>
            <div className={styles.hover_content}>
              <Img src={hover_video} />
              <div className={styles.gameName}>{item.gameName}</div>
            </div>
          </Card>
        ))}
      </div>
      <ReadMore
        onClick={() => {
          navigate("/slots", { state: { gameTypeId: 15, featured: false } });
        }}>
        <FormattedMessage id="READ_MORE" />
      </ReadMore>
    </div>
  );

  return (
    <>
      {isMobile() ? renderPopularSlotsMb() : renderPopularSlotsPc()}
      {isMobile() ? null : renderGame()}
    </>
  );
};
