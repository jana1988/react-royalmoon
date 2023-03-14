import { useMemo } from "react";
import styles from "./index.less";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { isMobile } from "@/utils";
import { useIntl } from "react-intl";

const fakeArticle = [
  {
    id: 1,
    title: "GETTING_START_1_TITLE",
    content: "GETTING_START_1_TEXT",
  },
  {
    id: 2,
    title: "GETTING_START_2_TITLE",
    content: "GETTING_START_2_TEXT",
  },
  {
    id: 3,
    title: "GETTING_START_3_TITLE",
    content: "GETTING_START_3_TEXT",
  },
  {
    id: 4,
    title: "GETTING_START_4_TITLE",
    content: "GETTING_START_4_TEXT",
  },
  {
    id: 5,
    title: "GETTING_START_5_TITLE",
    content: "GETTING_START_5_TEXT",
  },
  {
    id: 6,
    title: "GETTING_START_6_TITLE",
    content: "GETTING_START_6_TEXT",
  },
  {
    id: 7,
    title: "GETTING_START_7_TITLE",
    content: "GETTING_START_7_TEXT",
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

  const gettingStart = () => (
    <div className={styles.order}>
      {articleId ? (
        <Outlet context={currentArticle} />
      ) : (
        <>
          <div className={styles.header}>
            {intl.$t({ id: "GETTING_START" })}
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

  const gettingStartMb = () => <Outlet context={currentArticle} />;
  return isMobile() ? gettingStartMb() : gettingStart();
};

export default Index;
