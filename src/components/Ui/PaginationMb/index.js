import { Button, LoadingScope } from "@/components/Ui";
import styles from "./index.less";
export default (props) => {
  const { onClick = null, text = "", loading = false, objPage = {} } = props;
  if (objPage.total <= objPage.limit) return null;

  return (
    <div className={styles.readMore}>
      {loading ? (
        <LoadingScope />
      ) : objPage.page * objPage.limit < objPage.total ? (
        <Button className={styles.button} onClick={() => onClick && onClick()}>
          <span className={styles.text}>{text}</span>
        </Button>
      ) : null}
    </div>
  );
};
