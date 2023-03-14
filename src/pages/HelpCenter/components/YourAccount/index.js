import { useMemo } from "react";
import styles from "./index.less";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { isMobile } from "@/utils";
import { useIntl } from "react-intl";

const fakeArticle = [
  {
    id: 1,
    title: "YOUR_ACCOUNT_1_TITLE",
    content: "YOUR_ACCOUNT_1_TEXT",
  },
  {
    id: 2,
    title: "YOUR_ACCOUNT_2_TITLE",
    content: "YOUR_ACCOUNT_2_TEXT",
  },
  {
    id: 3,
    title: "YOUR_ACCOUNT_3_TITLE",
    content: "YOUR_ACCOUNT_3_TEXT",
  },
  {
    id: 4,
    title: "YOUR_ACCOUNT_4_TITLE",
    content: "YOUR_ACCOUNT_4_TEXT",
  },
  {
    id: 5,
    title: "YOUR_ACCOUNT_5_TITLE",
    content: "YOUR_ACCOUNT_5_TEXT",
  },
  {
    id: 6,
    title: "YOUR_ACCOUNT_6_TITLE",
    content: "YOUR_ACCOUNT_6_TEXT",
  },
  {
    id: 7,
    title: "YOUR_ACCOUNT_7_TITLE",
    content: "YOUR_ACCOUNT_7_TEXT",
  },

  {
    id: 8,
    title: "YOUR_ACCOUNT_8_TITLE",
    content: "YOUR_ACCOUNT_8_TEXT",
  },
  {
    id: 9,
    title: "YOUR_ACCOUNT_9_TITLE",
    content: "YOUR_ACCOUNT_9_TEXT",
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

  const yourAccount = () => (
    <div className={styles.order}>
      {articleId ? (
        <Outlet context={currentArticle} />
      ) : (
        <>
          <div className={styles.header}>{intl.$t({ id: "YOUR_ACCOUNT" })}</div>
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

  const yourAccountMb = () => <Outlet context={currentArticle} />;
  return isMobile() ? yourAccountMb() : yourAccount();
};

export default Index;
