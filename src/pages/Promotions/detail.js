import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./detail.less";
import { Img, Empty, Loading } from "@/components/Ui";
import { isMobile } from "@/utils";
import { useIntl } from "react-intl";
import { getPromotionDetail } from "@/services/promotions";

const PromotionsDetail = () => {
  const intl = useIntl();
  window.scrollTo(0, 0);
  const { type, id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchCampaignDetail = async () => {
    try {
      setLoading(true);
      const res = await getPromotionDetail(type, id);
      setLoading(false);
      setData(res);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaignDetail();
  }, [intl.locale]);

  const handleDeposit = () => {
    console.log("click deposit button");
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.empty}>
          <Loading />
        </div>
      ) : data.bannerUrl || data.bannerUrlMobile ? (
        <div className={styles.detail}>
          <Img
            src={isMobile() ? data.bannerUrlMobile : data.bannerUrl}
            className={styles.pic}
          />
          <div className={styles.title}>{data.name}</div>
          {data.content && (
            <div
              className={styles.detail_desc}
              dangerouslySetInnerHTML={{
                __html: data.content,
              }}
            />
          )}

          {/* <Button className={styles.btn} onClick={handleDeposit}>
          {intl.$t({ id: "PROMOTIONS_BUTTON" })}
        </Button> */}
        </div>
      ) : (
        <div className={styles.empty}>
          <Empty />
        </div>
      )}
    </div>
  );
};

export default PromotionsDetail;
