import styles from "./index.less";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
const Index = (props) => {
  const intl = useIntl();
  const currentArticle = useOutletContext();
  const navigate = useNavigate();

  const article = () => {
    return (
      <>
        <div className={styles.bgHide}>
          <div className={styles.title}>
            {intl.$t({ id: currentArticle[0].title })}
          </div>
          <div className={styles.text}>
            {intl.$t({ id: currentArticle[0].content })}
          </div>
        </div>
        <div className={styles.bg}>
          <div className={styles.title}>
            {intl.$t({ id: currentArticle[0].title })}
          </div>
          <div className={styles.text}>
            {intl.$t({ id: currentArticle[0].content })}
          </div>
        </div>
      </>
    );
  };
  return article();
};

export default Index;
