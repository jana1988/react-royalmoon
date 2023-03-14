import styles from "./index.less";
import back from "@/assets/ui/NavBar/back.svg";
import { useNavigate } from "react-router-dom";
import { Img } from "@/components/Ui";

const Index = (props) => {
  const { title = "title" } = props;
  const navigage = useNavigate();
  return (
    <div className={styles.navbar}>
      <div className={styles.content}>
        <div className={styles.back} onClick={() => navigage(-1)}>
          <Img src={back} />
        </div>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
};
export default Index;
