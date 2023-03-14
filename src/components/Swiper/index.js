import { Swiper, SwiperSlide } from "swiper/react";
import style from "./index.less";
import { isMobile } from "@/utils";
import { BtnNext } from "@/components/Ui/Icon";

// 增加以下代码以使用"自动轮播"功能
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
SwiperCore.use([Autoplay, Navigation, Pagination]);

export default (props) => {
  const {
    slidesPerView = 5,
    slidesPerGroup = 1,
    isBig = false,
    loop = true,
    data = [],
    centeredSlides = false,
    spaceBetween = 0,
    classNavigation = "",
    loopedSlides = 1,
    swiperContainer = "swiper",
    threshold = 10,
    initialSlide = 1,
  } = props;
  return (
    <div
      className={`${style.swiper} ${
        isBig && style.changeBg
      } ${swiperContainer}`}>
      <Swiper
        threshold={threshold}
        spaceBetween={spaceBetween}
        centeredSlides={centeredSlides}
        slidesPerGroup={slidesPerGroup}
        loop={loop}
        autoplay
        navigation={
          !isMobile() && {
            prevEl: `.${swiperContainer} .${style.prev}`,
            nextEl: `.${swiperContainer} .${style.next}`,
          }
        }
        slidesPerView={slidesPerView}
        pagination={{
          clickable: true,
        }}
        initialSlide={initialSlide}
        loopedSlides={loopedSlides}>
        {data.map((item, index) => (
          <SwiperSlide key={index}>{item.renderItem(item)}</SwiperSlide>
        ))}
      </Swiper>

      <div className={`${style.navigation} ${classNavigation}`}>
        <div className={style.prev}>
          <BtnNext />
        </div>
        <div className={style.next}>
          <BtnNext />
        </div>
      </div>
    </div>
  );
};
