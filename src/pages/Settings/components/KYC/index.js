import styles from "./index.less";
import { Upload, Button, Toast, Img } from "@/components/Ui";
import { useState, useRef, useEffect } from "react";
import idcard from "@/assets/settings/idcard.svg";
import icon_creditcard from "@/assets/settings/icon_creditcard.webp";
import icon_passport from "@/assets/settings/icon_passport.webp";
import icon_otherfile from "@/assets/settings/icon_otherfile.webp";

import id from "@/assets/settings/image_KYC_id@2x.webp";
import creditcard from "@/assets/settings/image_KYC_creditcard@2x.webp";
import passport from "@/assets/settings/image_KYC_passport@2x.webp";
import others from "@/assets/settings/image_KYC_others@2x.webp";
import idMb from "@/assets/settings/KYC_id@2x.webp";
import creditMb from "@/assets/settings/KYC_creditcard@2x.webp";
import passportMb from "@/assets/settings/KYC_passport@2x.webp";
import otherMb from "@/assets/settings/KYC_others@2x.webp";
import { isMobile } from "@/utils";
import { saveKyc } from "@/services/setting";
import { useIntl } from "react-intl";

const Index = (props) => {
  const intl = useIntl();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { data, onSuccess } = props;
  const tabs = [
    {
      index: 0,
      name: intl.$t({ id: "National_ID" }),
      icon: idcard,
      title: intl.$t({ id: "National_ID" }),
      subTitle: intl.$t({ id: "NATIONAL_ID_TITLE" }),
      desc: intl.$t({ id: "NATIONAL_ID_SUBTITLE" }),
      img: id,
      mobileImg: idMb,
    },
    {
      index: 1,
      name: intl.$t({ id: "CREDIT_CARD" }),
      icon: icon_creditcard,
      title: intl.$t({ id: "CREDIT_CARD" }),
      subTitle: intl.$t({ id: "CARD_TITLE" }),
      desc: intl.$t({ id: "CARD_SUBTITLE" }),
      img: creditcard,
      mobileImg: creditMb,
    },
    {
      index: 2,
      name: intl.$t({ id: "PASSPORT" }),
      icon: icon_passport,
      title: intl.$t({ id: "PASSPORT" }),
      subTitle: intl.$t({ id: "PASSPORT_TITLE" }),
      desc: intl.$t({ id: "NATIONAL_ID_SUBTITLE" }),
      img: passport,
      mobileImg: passportMb,
    },
    {
      index: 3,
      name: intl.$t({ id: "OTHER" }),
      icon: icon_otherfile,
      title: intl.$t({ id: "OTHER_TITLE" }),
      subTitle: intl.$t({ id: "OTHER_SUBTITLE" }),
      desc: intl.$t({ id: "OTHER_DESC" }),
      img: others,
      mobileImg: otherMb,
    },
  ];

  const [currentItem, setCurrentItem] = useState(tabs[0]);
  const idFront = useRef();
  const idBack = useRef();
  const cardFront = useRef();
  const cardBack = useRef();
  const passportFront = useRef();
  const passportBack = useRef();
  const proofOfAddress = useRef();

  const handleUploadSuccess = (filePath, isFront) => {
    if (currentItem.index === 0) {
      isFront ? (idFront.current = filePath) : (idBack.current = filePath);
    } else if (currentItem.index === 1) {
      isFront ? (cardFront.current = filePath) : (cardBack.current = filePath);
    } else if (currentItem.index === 2) {
      isFront
        ? (passportFront.current = filePath)
        : (passportBack.current = filePath);
    } else if (currentItem.index === 3) {
      isFront
        ? (proofOfAddress.current = filePath)
        : (proofOfAddress.current = filePath);
    }
  };

  const renderUpload = () => {
    if (currentItem.index < 3) {
      return (
        <div className={styles.footer}>
          <Upload
            subTitle={intl.$t({ id: "FRONT_SIDE" })}
            onChange={(filePath) => handleUploadSuccess(filePath, true)}
            key={`${currentItem.index}front`}
          />
          <Upload
            subTitle={intl.$t({ id: "BACK_SIDE" })}
            key={`${currentItem.index}back`}
            onChange={(filePath) => handleUploadSuccess(filePath, false)}
          />
        </div>
      );
    } else if (currentItem.index == 3) {
      return (
        <div className={styles.footer}>
          <Upload
            onChange={(filePath) => handleUploadSuccess(filePath, true)}
            key={`${currentItem.index}front`}
          />
        </div>
      );
    }

    return <></>;
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    let res = null;
    try {
      if (currentItem.index === 0) {
        if (!(idFront.current || idBack.current)) {
          Toast.info("Please upload");
          return;
        }
        res = await saveKyc({
          imageUrls: [idFront.current, idBack.current],
          tag: "0",
        });
      } else if (currentItem.index === 1) {
        if (!cardFront.current || !cardBack.current) {
          Toast.info("Please upload");
          return;
        }
        res = await saveKyc({
          imageUrls: [cardFront.current, cardBack.current],
          tag: "1",
        });
      } else if (currentItem.index === 2) {
        if (!passportFront.current || !passportBack.current) {
          Toast.info("Please upload");
          return;
        }
        res = await saveKyc({
          imageUrls: [passportFront.current, passportBack.current],
          tag: "2",
        });
      } else if (currentItem.index === 3) {
        if (!proofOfAddress.current) {
          Toast.info("Please upload");
          return;
        }
        res = await saveKyc({
          imageUrls: [proofOfAddress.current],
          tag: "3",
        });
      }
      if (res?.success) {
        Toast.info(intl.$t({ id: "UPLOAD_SUCCESS" }));
        onSuccess();
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    setCurrentItem(tabs[0]);
  }, [intl.locale]);

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        {tabs.map((item, index) => {
          return (
            <div
              key={item.name}
              className={`${styles.btn} ${
                currentItem.index === index ? styles.active : ""
              }`}
              onClick={() => setCurrentItem(item)}>
              {item.name}
            </div>
          );
        })}
      </div>
      <div className={styles.header}>
        <Img src={currentItem.icon} />
        {currentItem.title}
      </div>
      <div className={styles.body}>
        <div className={styles.subTitle}>{currentItem.subTitle}</div>
        <div
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: currentItem.desc }}></div>
        <img
          src={isMobile() ? currentItem.mobileImg : currentItem.img}
          className={styles.helpImg}
        />
        <div className={styles.desc}>{intl.$t({ id: "SETTING_TIP" })}</div>
      </div>

      {renderUpload()}
      <div className={styles.accept}>{intl.$t({ id: "UPLOAD_ACCPET" })}</div>
      <Button
        className={styles.confirmBtn}
        onClick={handleSubmit}
        loading={submitLoading}>
        {intl.$t({ id: "CONFIRM" })}
      </Button>
    </div>
  );
};

export default Index;
