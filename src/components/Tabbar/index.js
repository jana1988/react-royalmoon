import styles from "./index.less";
import { Home, User, Promotions, AcCharge } from "@/components/Ui/Icon";
import { useLocation } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Link from "@/components/Link";

const Index = () => {
  const { pathname = "" } = useLocation() || {};

  const tabbar = [
    {
      icon: <Home />,
      name: <FormattedMessage id="HOME" />,
      path: "/home",
    },
    {
      icon: <Promotions />,
      name: <FormattedMessage id="PROMOTIONS" />,

      path: "/promotions",
    },
    {
      icon: <AcCharge />,
      name: <FormattedMessage id="CASHIER" />,
      path: "/depositwithdraw",
    },
    {
      icon: <User />,
      name: <FormattedMessage id="ACCOUNT" />,
      path: "/personal",
    },
  ];
  return (
    <div className={styles.tabbar}>
      <div className={styles.content}>
        {tabbar.map((item, index) => (
          <Link
            className={`${styles.item} ${
              pathname === item.path ? styles.active : ""
            }`}
            key={index}
            to={item.path}
            isTarget={false}
            isIntercept={item.path === "/depositwithdraw" ? true : false}>
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
