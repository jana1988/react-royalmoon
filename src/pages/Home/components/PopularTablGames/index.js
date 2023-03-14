import styles from "./index.less";
import { Title } from "../";
import { Card } from "@/components/Ui";
import Swiper from "@/components/Swiper";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { isMobile } from "@/utils";
export default (props) => {
  const { popularTablGames = [] } = props;
  const [data, setData] = useState([]);

  const dealData = () => {
    const data = popularTablGames.map((item) => ({
      ...item,
      renderItem,
    }));

    setData(data);
  };

  useEffect(() => {
    dealData();
  }, []);

  const renderItem = (item) => (
    <Card src={item.gameImgUrl} className={styles.card} item={item} />
  );

  return (
    <div className={styles.popularTablGames}>
      <div className={styles.content}>
        <Title>
          <FormattedMessage id="POPULAR_TABLE_GAMES" />
        </Title>
        <div className={styles.box}>
          <div className={styles.swiperWarpper}>
            <Swiper
              slidesPerGroup={isMobile() ? 3 : 6}
              slidesPerView={"auto"}
              data={data}
              classNavigation={styles.navigation}
              loopedSlides={6}
              swiperContainer="renderPopularTablGames"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
