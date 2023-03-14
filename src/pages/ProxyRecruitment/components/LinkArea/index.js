import styles from "./index.less";
import indexStyles from "../../index.less";
import { Button } from "@/components/Ui";

export default (props) => {
  const { title, btnContent, onBtnClick = () => {} } = props || {};
  return (
    <div className={styles.linkarea}>
      <div className={indexStyles.h3}>{title}</div>
      <div className={indexStyles.button}>
        <Button className={indexStyles.content} onClick={onBtnClick}>
          {btnContent}
        </Button>
      </div>
    </div>
  );
};
