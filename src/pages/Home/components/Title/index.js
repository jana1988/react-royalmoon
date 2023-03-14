import styles from "./index.less";
import { useIntl } from "react-intl";
import { useEffect } from "react";

export default (props) => {
  const intl = useIntl();

  return <div className={styles[`title_${intl.locale}`]}>{props.children}</div>;
};
