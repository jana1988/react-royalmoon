import { useMemo } from "react";
import styles from "./index.less";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { isMobile } from "@/utils";
import { useIntl } from "react-intl";

const fakeArticle = [
  {
    id: 1,
    title: "TERMS_CONDITIONS_1_TITLE",
    content: "TERMS_CONDITIONS_1_TEXT",
  },
  {
    id: 2,
    title: "TERMS_CONDITIONS_2_TITLE",
    content: "TERMS_CONDITIONS_2_TEXT",
  },
  {
    id: 3,
    title: "TERMS_CONDITIONS_3_TITLE",
    content: "TERMS_CONDITIONS_3_TEXT",
  },
  {
    id: 4,
    title: "TERMS_CONDITIONS_4_TITLE",
    content: "TERMS_CONDITIONS_4_TEXT",
  },
  {
    id: 5,
    title: "TERMS_CONDITIONS_5_TITLE",
    content: "TERMS_CONDITIONS_5_TEXT",
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

  const termsNConditions = () => (
    <div className={styles.order}>
      {articleId ? (
        <Outlet context={currentArticle} />
      ) : (
        <>
          <div className={styles.header}>
            {intl.$t({ id: "TERMS_CONDITIONS" })}
          </div>
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

  const termsNConditionsMb = () => <Outlet context={currentArticle} />;
  return isMobile() ? termsNConditionsMb() : termsNConditions();
};

export default Index;
