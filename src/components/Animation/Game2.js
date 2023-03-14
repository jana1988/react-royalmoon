import bg from "./bg.webp";
import styles from "./Game2.less";
import { Img } from "@/components/Ui";
export default (props) => {
  const { _styles = () => {} } = props;
  return (
    <div className={styles.game2} style={{ ..._styles() }}>
      <Img src={bg} className={styles.bg} />
      <div data-text="ROYALMOON" className={styles.text}>
        ROYALMOON
      </div>
    </div>
  );
};
