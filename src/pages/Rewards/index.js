import freespin from "@/assets/personal/freespins@2x.webp";

import styles from "./index.less";
import { useEffect, useState } from "react";
import { AcDiscount } from "@/components/Ui/Icon";
import { isMobile, getGameUrl } from "@/utils";

import { NavBar, Img, Empty, Button, Loading } from "@/components/Ui";
import { useIntl } from "react-intl";
import useGuard from "@/hooks/useGuard";
import { getFreeSpin } from "@/services/personal";
import dayjs from "@/common/day";
import { useNavigate } from "react-router-dom";
import { freeSpinStatus } from "./constant";
const Index = () => {
  useGuard();
  const navigate = useNavigate();

  const intl = useIntl();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFreeSpin = async () => {
    try {
      setLoading(true);
      const res = await getFreeSpin();
      setData(res.list);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFreeSpin();
  }, []);

  const renderData = () => (
    <div className={styles.content}>
      {isMobile() ? (
        <NavBar title={intl.$t({ id: "REWARDS" })} />
      ) : (
        <div className={styles.header}>
          <AcDiscount />
          {intl.$t({ id: "REWARDS" })}
        </div>
      )}
      {data.length ? (
        <div className={styles.wrap}>
          {data
            .filter((item) => item.status !== 0)
            .map((item, index) => (
              <div className={styles.box} key={index}>
                <div className={styles.item}>
                  <div className={styles.title}>
                    {intl.$t({ id: "REWARDS_FREE_SPINS" })}
                  </div>
                  <div className={styles.img}>
                    <Img src={freespin} />
                  </div>
                  <div className={styles.name}>{item.gameName}</div>
                  <div className={styles.tips}>
                    <div className={styles.text}>
                      <div className={styles.left}>
                        {intl.$t({ id: "REMAINING_TOTAL" })}
                      </div>
                      <div className={styles.right}>{item.freeCount}</div>
                    </div>
                    <div className={styles.text}>
                      <div className={styles.left}>
                        {intl.$t({ id: "REWARDS_VALUE" })}
                      </div>
                      <div className={styles.right}>{item.totalAmount}</div>
                    </div>
                    <div className={styles.text}>
                      <div className={styles.left}>
                        {intl.$t({ id: "REWARDS_EXPIRES_IN" })}
                      </div>
                      <div className={styles.right}>
                        {dayjs(item.expirationDate)
                          .tz("Asia/Tokyo")
                          .format("MM-DD HH:mm")}
                      </div>
                    </div>
                  </div>
                  {freeSpinStatus[item.status || 10].name && (
                    <div className={styles.button}>
                      <Button
                        onClick={() => {
                          navigate(
                            getGameUrl({
                              gameApiCode: item.gameApiCode,
                              gameCode: item.gameCode,
                              gameApiId: item.gameApiId,
                              gameName: item.gameName,
                              favorite: item.favorite,
                              gameApiName: item.gameApiName,
                            }),
                          );
                        }}
                        disabled={freeSpinStatus[item.status || 10].disbaled}>
                        {freeSpinStatus[item.status || 10].name}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className={styles.emptyWrap}>
          <Empty className={styles.empty} />
        </div>
      )}
    </div>
  );

  const renderLoading = () => (
    <div className={styles.loading}>
      <Loading />
    </div>
  );
  if (loading) {
    return renderLoading();
  }

  return <div className={styles.discount}>{renderData()}</div>;
};

export default Index;
