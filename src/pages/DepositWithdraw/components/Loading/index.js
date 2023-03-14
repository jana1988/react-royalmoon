import loadingIcon from "@/assets/icon/loading.svg";
import mobileStyles from "./mobile.less";
import desktopStyles from "./desktop.less";
import { isMobile } from "@/utils";
import { Img } from "@/components/Ui";

export default (props) => {
  const styles = isMobile() ? mobileStyles : desktopStyles;

  return (
    <div className={styles["loading"]}>
      <Img src={loadingIcon} />
    </div>
  );
};
