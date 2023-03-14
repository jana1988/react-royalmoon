import React, { useState, useEffect } from "react";
import styles from "./index.less";
import iconPromotions from "@/assets/promotions/promotions_logo.webp";
import { getPromotionsList } from "@/services/promotions";
import { useNavigate } from "react-router-dom";
import { Button, Img, Loading, Empty } from "@/components/Ui";
import { isMobile } from "@/utils";
import { isArray } from "lodash";
import { useIntl } from "react-intl";
import no_image from "@/assets/promotions/no_image_1@2x.webp";

const Promotions = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCampaigns = () => {
    setLoading(true);
    getPromotionsList()
      .then((res) => {
        if (isArray(res)) {
          setData(res);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCampaigns();
  }, [intl.locale]);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <Img src={iconPromotions} />
            <span className={styles[`tip_${intl.locale}`]}>
              {intl.$t({ id: "PROMOTIONS_TITLE" })}
            </span>
          </div>
          {data.length ? (
            <div className={styles.content}>
              {data.map((item) => {
                return (
                  <div className={styles.item} key={`${item.uid}`}>
                    <Img
                      src={
                        isMobile()
                          ? item.bannerUrlMobile || no_image
                          : item.bannerUrl || no_image
                      }
                      className={styles.pic}
                    />
                    <div className={styles.title}>{item.name}</div>
                    {item.content && (
                      <div
                        className={styles.subTitle}
                        dangerouslySetInnerHTML={{
                          __html: item.content,
                        }}
                      />
                    )}
                    <Button
                      onClick={() =>
                        navigate(`/promotions/${item.type}/${item.id}`)
                      }
                      className={styles.btn}>
                      <span>{intl.$t({ id: "PROMOTIONS_BUTTON" })}</span>
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.empty}>
              <Empty />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Promotions;
