import styles from "./index.less";
import { Title, ReadMore } from "../";
import { Img } from "@/components/Ui";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { isMobile } from "@/utils";
export default (props) => {
  const { promotions = [] } = props;
  const navigate = useNavigate();

  return (
    <div className={styles.promotions}>
      <div className={styles.content}>
        <Title>
          <FormattedMessage id="PROMOTIONS" />
        </Title>
        <div className={styles.box}>
          {promotions
            .filter((item) => item.bannerUrlMobile || item.bannerUrl)
            .slice(0, 3)
            .map((item, index) => (
              <div
                className={styles.card}
                key={index}
                onClick={() => navigate(`/promotions/${item.type}/${item.id}`)}>
                <Img src={isMobile() ? item.bannerUrlMobile : item.bannerUrl} />
              </div>
            ))}
        </div>
      </div>
      <ReadMore
        onClick={() => {
          navigate("/promotions");
        }}>
        <FormattedMessage id="READ_MORE" />
      </ReadMore>
    </div>
  );
};
