import styles from "./index.less";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { isMobile } from "@/utils";
import { Button, Img } from "@/components/Ui";
import LinkArea from "./components/LinkArea";
import AdvantagesLeft from "./components/AdvantagesLeft";
import image_commission from "@/assets/proxyrecruitment/image_commission.webp";
import recruitment_mockup from "@/assets/proxyrecruitment/recruitment_mockup.webp";
import image_brandintroduction from "@/assets/proxyrecruitment/image_brandintroduction.webp";
import pyramid1 from "@/assets/proxyrecruitment/1@2x.webp";
import pyramid2 from "@/assets/proxyrecruitment/2@2x.webp";
import pyramid3 from "@/assets/proxyrecruitment/3@2x.webp";
import pyramid4 from "@/assets/proxyrecruitment/4@2x.webp";
import {
  HcBrands,
  HcCustomer,
  HcLocalized,
  HcCommission,
  HcPayment,
  HcCapital,
  HcMail,
  HcTelegram,
  HcSkype,
} from "@/components/Ui/Icon";

const advantagesLeftList = [
  {
    icon: HcBrands,
    title: <FormattedMessage id="PROXY_ADVANTAGES_LEFT_TITLE_1" />,
    sub: <FormattedMessage id="PROXY_ADVANTAGES_LEFT_DESC_1" />,
  },
  {
    icon: HcCustomer,
    title: <FormattedMessage id="PROXY_ADVANTAGES_LEFT_TITLE_2" />,
    sub: <FormattedMessage id="PROXY_ADVANTAGES_LEFT_DESC_2" />,
  },
  {
    icon: HcLocalized,
    title: <FormattedMessage id="PROXY_ADVANTAGES_LEFT_TITLE_3" />,
    sub: <FormattedMessage id="PROXY_ADVANTAGES_LEFT_DESC_3" />,
  },
  {
    icon: HcCommission,
    title: <FormattedMessage id="PROXY_ADVANTAGES_LEFT_TITLE_4" />,
    sub: <FormattedMessage id="PROXY_ADVANTAGES_LEFT_DESC_4" />,
  },
  {
    icon: HcPayment,
    title: <FormattedMessage id="PROXY_ADVANTAGES_LEFT_TITLE_5" />,
    sub: <FormattedMessage id="PROXY_ADVANTAGES_LEFT_DESC_5" />,
  },
  {
    icon: HcCapital,
    title: <FormattedMessage id="PROXY_ADVANTAGES_LEFT_TITLE_6" />,
    sub: <FormattedMessage id="PROXY_ADVANTAGES_LEFT_DESC_6" />,
  },
];

const brandDescList = [
  "PROXY_BRAND_DESC_1",
  "PROXY_BRAND_DESC_2",
  "PROXY_BRAND_DESC_3",
  "PROXY_BRAND_DESC_4",
];

const brandImageList = [
  {
    img: image_brandintroduction,
    alt: "image_brandintroduction",
  },
  {
    img: image_brandintroduction,
    alt: "image_brandintroduction",
  },
  {
    img: image_brandintroduction,
    alt: "image_brandintroduction",
  },
];

const contactList = [
  {
    icon: HcMail,
    desc: "PROXY_CONTACT_MAIL",
  },
  {
    icon: HcTelegram,
    desc: "PROXY_CONTACT_TELEGRAM",
  },
  {
    icon: HcSkype,
    desc: "PROXY_CONTACT_SKYPE",
  },
];
export default () => {
  const navigate = useNavigate();
  const contact = useRef();
  return (
    <div className={styles.container}>
      <div className={styles.h1}>
        <FormattedMessage id="PROXY_TITLE" />
      </div>
      <div className={styles.hdesc}>
        <FormattedMessage id="PROXY_TITLE_DESC" />
      </div>
      <div className={styles.button}>
        <Button
          className={styles.content}
          onClick={() => {
            contact && contact.current.scrollIntoView({ behavior: "smooth" });
          }}>
          <FormattedMessage id="PROXY_TITLE_BTN" />
        </Button>
      </div>
      <div className={styles.h2}>
        <FormattedMessage id="PROXY_SUB_TITLE" />
      </div>
      <div className={styles.hdesc}>
        <FormattedMessage id="PROXY_SUB_TITLE_DESC" />
      </div>
      {isMobile() ? (
        <div className={styles.pyramid}>
          <Img src={pyramid1} alt="pyramid1" />
          <Img src={pyramid2} alt="pyramid2" />
          <Img src={pyramid3} alt="pyramid3" />
          <Img src={pyramid4} alt="pyramid4" />
        </div>
      ) : (
        <Img src={image_commission} alt="image_commission" />
      )}

      <div className={styles.commission_num}>
        <span>{"<$20K"}</span>
        <span>{"$20K~$30K"}</span>
        <span>{"$30K~$50K"}</span>
        <span>{">$100K"}</span>
      </div>
      <LinkArea
        title={<FormattedMessage id="PROXY_INTRODUCE_AREA_DESC_1" />}
        btnContent={<FormattedMessage id="PROXY_INTRODUCE_AREA_BTN_1" />}
        onBtnClick={() => {
          contact && contact.current.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <div className={styles.advantages}>
        <div className={styles.h2}>
          <FormattedMessage id="PROXY_ADVANTAGES_TITLE" />
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            {advantagesLeftList.map((item, index) => (
              <AdvantagesLeft
                key={`advantagesLeft_${index}`}
                icon={item.icon}
                title={item.title}
                sub={item.sub}
              />
            ))}
          </div>
          <div className={styles.right}>
            <Img src={recruitment_mockup} alt="recruitment_mockup" />
          </div>
        </div>
      </div>
      <LinkArea
        title={<FormattedMessage id="PROXY_INTRODUCE_AREA_DESC_2" />}
        btnContent={<FormattedMessage id="PROXY_INTRODUCE_AREA_BTN_2" />}
        onBtnClick={() => navigate("/")}
      />
      <div className={styles.introduction}>
        <div className={styles.h2}>
          <FormattedMessage id="PROXY_BRAND_TITLE" />
        </div>
        <div className={styles.content}>
          {brandDescList.map((brandDesc, i) => {
            return (
              <div key={`brandDesc_${i}`}>
                <FormattedMessage id={brandDesc} />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.introduction2}>
        <div className={styles.h2}>
          <FormattedMessage id="PROXY_BRAND_TITLE" />
        </div>
        <div className={styles.swiperDiv}>
          <Swiper
            slidesPerView={1.2}
            spaceBetween={20}
            centeredSlides={true}
            centeredSlidesBounds={true}
            resistanceRatio={0}
            initialSlide={1}
            breakpoints={{
              750: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            className="mySwiper">
            {brandImageList.map((brandImage, i) => {
              return (
                <SwiperSlide key={`brandImage_${i}`}>
                  <Img src={brandImage.img} alt={brandImage.alt} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className={styles.content}>
          <FormattedMessage id="PROXY_BRAND_DESC_5" />
        </div>
      </div>
      <div ref={contact} className={styles.contact}>
        <div className={styles.h2}>
          <FormattedMessage id="PROXY_CONTACT_TITLE" />
        </div>
        <div>
          {contactList.map(({ icon: Icon, desc }, i) => {
            return (
              <div key={`contact_${i}`}>
                <Icon />
                <div>
                  <FormattedMessage id={desc} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
