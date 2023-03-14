import styles from "./index.less";
import { Title } from "../";
import { Card } from "@/components/Ui";
import Swiper from "@/components/Swiper";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { isMobile } from "@/utils";

export default (props) => {
  const { popularSlots = [] } = props;
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
          <FormattedMessage id="You May Like" />
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
          <FormattedMessage id="You May Like" />
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
      </div>
    </div>
  );

  return <>{isMobile() ? renderPopularSlotsMb() : renderPopularSlotsPc()}</>;
};
