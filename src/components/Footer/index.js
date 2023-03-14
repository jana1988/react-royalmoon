import styles from "./index.less";
import { isMobile, getGameUrl } from "@/utils";
import Swiper from "@/components/Swiper";
import { Img, Card } from "@/components/Ui";

import line from "@/assets/footer/icon_line@2x.png";
import facebook from "@/assets/footer/logo_facebook@2x.png";
import instagram from "@/assets/footer/logo_instagram@2x.png";
import twitter from "@/assets/footer/logo_twitter@2x.png";

import __3 from "@/assets/footer/icon_bank_transfer@3x.png";
import __2 from "@/assets/footer/icon_mastercard@3x.png";
import __4 from "@/assets/footer/icon_crypto@3x.png";
import __5 from "@/assets/footer/icon_tigerpay@3x.png";
import __1 from "@/assets/footer/icon_visa@3x.png";

import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "@/components";
import { useEffect, useRef } from "react";
import { trademarkData } from "./constant";

const Index = () => {
  const intl = useIntl();
  const timerRef = useRef();

  const paizhao = () => {
    window.apg_cbeafcfe_e119_4867_9113_e44e6b240ed9 &&
      window.apg_cbeafcfe_e119_4867_9113_e44e6b240ed9.init();
  };

  useEffect(() => {
    paizhao();
    timerRef.current = setInterval(paizhao, 10 * 60 * 1000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const cooperationData = [__1, __2, __3, __4, __5];

  const MessageUl = ({ data }) => (
    <ul className={styles.ul}>
      {data.map((item, index) => (
        <li className={styles.li} key={index}>
          <Link
            className={styles.link}
            to={item.path}
            state={{ index: `${index + 1}` }}
            isTarget={false}
            isIntercept={item.path.indexOf("/gamesport") !== -1}>
            {item.text}
          </Link>
        </li>
      ))}
    </ul>
  );

  const renderTrademarkPcItem = (item) => (
    <img src={item.imgUrl} className={styles.card} />
  );
  const renderTrademarkPc = () => (
    <div className={styles.trademarkPc}>
      <div className={styles.box}>
        <Swiper
          slidesPerGroup={isMobile() ? 3 : 6}
          slidesPerView={isMobile() ? 3 : "auto"}
          data={trademarkData.map((item) => ({
            ...item,
            renderItem: renderTrademarkPcItem,
          }))}
          classNavigation={styles.navigation}
          loopedSlides={6}
        />
      </div>
    </div>
  );

  const renderTrademarkPcMb = () => (
    <div className={styles.trademarkPcMb}>
      <div className={styles.content}>
        <div className={styles.cardWrapper}>
          {trademarkData.map((item, index) => (
            <img src={item.imgUrl} className={styles.card} key={index} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.footer}>
      {isMobile() ? renderTrademarkPcMb() : renderTrademarkPc()}

      {!isMobile() && (
        <div className={styles.message}>
          <div className={styles.wrapper}>
            <div className={styles.commom}>
              <div className={styles.title}>
                <FormattedMessage id="INFO" />
              </div>
              <MessageUl
                data={[
                  {
                    text: <FormattedMessage id="FOOTER_ABOUT_US" />,
                    path: "/helpcenter/aboutus",
                  },
                  {
                    text: <FormattedMessage id="CONTACT_US" />,
                    path: "/helpcenter/contactus",
                  },
                  {
                    text: <FormattedMessage id="TERMS_AND_CONDITIONS" />,
                    path: "/helpcenter/termsandcontions/1",
                  },
                  {
                    text: <FormattedMessage id="RESPONSIBLE_GAMING" />,
                    path: "/helpcenter/termsandcontions/2",
                  },
                  // {
                  //   text: <FormattedMessage id="PRIVACY_POLICY" />,
                  //   path: "/helpcenter/termsandcontions/4",
                  // },
                  {
                    text: <FormattedMessage id="COOKIE_POLICY" />,
                    path: "/helpcenter/termsandcontions/4",
                  },
                  {
                    text: <FormattedMessage id="TERMS_CONDITIONS_5_TITLE" />,
                    path: "/helpcenter/termsandcontions/5",
                  },
                  // {
                  //   text: <FormattedMessage id="AFFILIATE" />,
                  //   path: "/proxyrecruitment",
                  // },
                ]}
              />
            </div>
            <div className={styles.commom}>
              <div className={styles.title}>
                <FormattedMessage id="HELP" />
              </div>
              <MessageUl
                data={[
                  {
                    text: <FormattedMessage id="YOUR_ACCOUNT" />,
                    path: "/helpcenter/youraccount",
                  },
                  {
                    text: <FormattedMessage id="GETTING_START" />,
                    path: "/helpcenter/gettingstart",
                  },
                  {
                    text: <FormattedMessage id="GETTING_START_2_TITLE" />,
                    path: "/helpcenter/gettingstart/2",
                  },
                ]}
              />
            </div>
            <div className={styles.commom}>
              <div className={styles.title}>
                <FormattedMessage id="GAME" />
              </div>
              <MessageUl
                data={[
                  {
                    text: <FormattedMessage id="SLOTS" />,
                    path: "/slots",
                  },
                  {
                    text: <FormattedMessage id="LIVE_CASINO" />,
                    path: "/live",
                  },
                  {
                    text: <FormattedMessage id="SPORTS" />,
                    path: getGameUrl({ gameCode: "sport", gameApiId: 10 }),
                  },
                ]}
              />
            </div>
            <div className={styles.commom}>
              <div className={styles.title}>
                <FormattedMessage id="LICENSES" />
              </div>
              <div
                id="apg-cbeafcfe-e119-4867-9113-e44e6b240ed9"
                data-apg-seal-id="cbeafcfe-e119-4867-9113-e44e6b240ed9"
                data-apg-image-size="256"
                data-apg-image-type="basic-light-large"
                className={styles.licenses}></div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.follow}>
        <div className={styles.wrapper}>
          <p className={styles.title}>
            <FormattedMessage id="FOLLOW_US" />
          </p>
          <div className={styles.imgs}>
            {[
              {
                icon: facebook,
                path: "https://www.facebook.com/profile.php?id=100079546664345",
              },
              {
                icon: twitter,
                path: "https://twitter.com/royalmooncasino",
              },
              {
                icon: instagram,
                path: "https://www.instagram.com/royalmooncasino/",
              },
              {
                icon: line,
                path: "https://line.me/R/ti/p/@882qptva?from=page",
              },
            ].map((item, index) => (
              <a
                rel="noopener noreferrer"
                target="_blank"
                key={index}
                className={styles.img}
                href={item.path}>
                <Img src={item.icon} />
              </a>
            ))}
            <div
              id="apg-cbeafcfe-e119-4867-9113-e44e6b240ed9"
              data-apg-seal-id="cbeafcfe-e119-4867-9113-e44e6b240ed9"
              data-apg-image-size="256"
              data-apg-image-type="basic-light-large"
              className={styles.licenses}></div>
          </div>
        </div>
      </div>

      {/* <div className={styles.cooperation}>
        <div className={styles.wrapper}>
          {cooperationData.map((item, index) => (
            <Img className={styles.img} key={index} src={item} />
          ))}
        </div>
      </div> */}
      <div className={styles.tips}>
        <p
          className={styles.text}
          dangerouslySetInnerHTML={{
            __html: intl.$t({ id: "TIPS_TEXT_1" }),
          }}></p>
      </div>
    </div>
  );
};

export default Index;
