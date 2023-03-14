import _404 from "@/assets/image_404@3x.webp";
import { Button, Img } from "@/components/Ui";
import styles from "./index.less";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className={styles.not_found}>
      <div className={styles.bg}>
        <Img src={_404} />
      </div>
      <div className={styles.content}>
        <div className={styles.text}>
          Oops! <br />
          The page you're trying to visit does not exist.
        </div>

        <Link to="/">
          <Button className={styles.button}>Go Back to Home Page</Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
