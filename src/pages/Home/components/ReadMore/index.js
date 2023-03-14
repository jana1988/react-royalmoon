import { Button } from "@/components/Ui";
import styles from "./index.less";
export default (props) => {
  const { className = "" } = props;
  return (
    <div className={`${styles.readMore} ${className}`}>
      <Button
        className={styles.button}
        onClick={() => props.onClick && props.onClick()}>
        <span className={styles.text}>{props.children}</span>
      </Button>
    </div>
  );
};
