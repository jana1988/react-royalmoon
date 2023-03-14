import Swiper from "@/components/Swiper";
import { Img } from "@/components/Ui";
import styles from "./index.less";
import { isMobile } from "@/utils";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default (props) => {
  const { banners = {} } = props;
  const language = useSelector((state) => state.language);
  const [data, setData] = useState({});

  const dealData = () => {
    const data = {};
    Object.keys(banners).forEach((item) => {
      const _content = banners[item].map((item) => ({
        ...item,
        renderItem: renderBannerItem,
      }));
      data[item] = _content;
    });
    setData(data);
  };

  useEffect(() => {
    dealData();
  }, []);

  const renderBannerItem = (item) => (
    <a
      className={styles.banner_item}
      href={item.redirect}
      target="_blank"
      rel="noopener noreferrer">
      <Img className={styles.bg} src={`/api/${item.image}`} />
    </a>
  );
  return (
    <div className={styles.topSwiper}>
      <Swiper
        slidesPerView="auto"
        isBig={true}
        data={data[language.locale]}
        centeredSlides={true}
        classNavigation={styles.navigation}
        loopedSlides={3}
        spaceBetween={isMobile() ? 100 : 0}
        swiperContainer="banner"
        threshold={isMobile() ? 10 : 50}
      />
    </div>
  );
};
