import { useMemo } from "react";
import styles from "./index.less";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { isMobile } from "@/utils";
import { useIntl } from "react-intl";

const fakeArticle = [
  {
    id: 1,
    title: "CONTACT_US_1_TITLE",
    content: "CONTACT_US_1_TEXT",
  },
];

const Index = (props) => {
  const navigate = useNavigate();
  const intl = useIntl();

  const { articleId } = useParams();
  const handleTitleClick = (id) => () => {
    navigate(`${id}`);
  };

  const currentArticle = useMemo(
    () => fakeArticle.filter(({ id }) => id === parseInt(articleId)),
    [articleId],
  );

  const contactUs = () => (
    <div className={styles.order}>
      {articleId ? (
        <Outlet context={currentArticle} />
      ) : (
        <>
          <div className={styles.header}>{intl.$t({ id: "CONTACT_US" })}</div>
          <div className={styles.titleList}>
            {fakeArticle &&
              fakeArticle.map(({ title, id }) => {
                return (
                  <div
                    key={id}
                    onClick={handleTitleClick(id)}
                    className={styles.title}>
                    {intl.$t({ id: title })}
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );

  const contactUsMb = () => <Outlet context={currentArticle} />;
  return isMobile() ? contactUsMb() : contactUs();
};

export default Index;
