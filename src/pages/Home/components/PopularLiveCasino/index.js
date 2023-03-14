import styles from "./index.less";
import { Title, ReadMore } from "../";
import { Card } from "@/components/Ui";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { isMobile } from "@/utils";
export default (props) => {
  const { popularLives = [] } = props;
  const navigate = useNavigate();

  const renderPopularLiveCasinoPc = () => (
    <div className={styles.popularLiveCasino}>
      <Title>
        <FormattedMessage id="POPULAR_LIVE_CASINO" />
      </Title>
      <div className={styles.content}>
        {popularLives.slice(0, 12).map((item, index) => (
          <Card
            src={item.gameImgUrl}
            key={index}
            className={styles.card}
            item={item}
          />
        ))}
      </div>
      <ReadMore
        onClick={() => {
          navigate("/live");
        }}>
        <FormattedMessage id="READ_MORE" />
      </ReadMore>
    </div>
  );

  const renderPopularLiveCasinoMb = () => (
    <div className={styles.popularLiveCasino}>
      <Title>
        <FormattedMessage id="POPULAR_LIVE_CASINO" />
      </Title>
      <div className={styles.content}>
        {popularLives.slice(0, 6).map((item, index) => (
          <Card
            src={item.gameImgUrl}
            key={index}
            className={styles.card}
            item={item}
          />
        ))}
      </div>
      <ReadMore
        onClick={() => {
          navigate("/live");
        }}>
        <FormattedMessage id="READ_MORE" />
      </ReadMore>
    </div>
  );

  return isMobile() ? renderPopularLiveCasinoMb() : renderPopularLiveCasinoPc();
};
