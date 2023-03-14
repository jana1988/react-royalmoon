import { Menu } from "@/components/Ui";
import HelpCenterMenuMb from "./components/HelpCenterMenuMb";
import styles from "./index.less";
import { Outlet, useLocation } from "react-router-dom";
import {
  Help,
  Mail,
  Onlinesupport,
  Download,
  Print,
} from "@/components/Ui/Icon";
import { isMobile } from "@/utils";
import { useIntl } from "react-intl";
import exportPDF from "@/common/exportPDF";
import exportPrint from "@/common/exportPrint";
import { useRef } from "react";
import { liveChat, openEmail } from "@/utils";
import { useSelector } from "react-redux";
import { routeMb, routePc } from "./constant";

const Index = () => {
  const { isLogin } = useSelector((state) => state.auth);
  const intl = useIntl();
  const location = useLocation();
  const pdfRef = useRef();

  const renderPc = () => (
    <div className={styles.helpCenter}>
      <div className={styles.helpCenterWrap}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <Help />
            {intl.$t({ id: "HELP_CENTER" })}
          </div>
          <div className={styles.buttonWrapper}>
            <button type="button" className={styles.btn} onClick={openEmail}>
              <Mail className={styles.btnIcon} />
              {intl.$t({ id: "EMAIL_US" })}
            </button>
            {isLogin && (
              <button type="button" className={styles.btn} onClick={liveChat}>
                <Onlinesupport className={styles.btnIconF} />
                {intl.$t({ id: "LIVE_CHAT" })}
              </button>
            )}
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.menu}>
              <Menu
                mode="inline"
                items={routePc}
                onClick={(e) => console.log("click ", e)}
                defaultKey={location.state ? location.state.index : "1"}
              />
            </div>
          </div>
          <div ref={pdfRef} className={styles.right}>
            <Outlet />
          </div>
          <div className={styles.buttons}>
            <Download
              className={styles.download}
              onClick={() => {
                exportPDF("PDF", pdfRef.current);
              }}
            />
            <Print
              className={styles.print}
              onClick={() => {
                exportPrint(pdfRef.current);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderMb = () => {
    return (
      <div className={styles.helpCenter}>
        <div className={styles.title}>
          <Help className={styles.helpIcon} />
          {intl.$t({ id: "HELP_CENTER" })}
        </div>
        <div className={styles.buttonWrapper}>
          <button type="button" className={styles.btn} onClick={openEmail}>
            <Mail className={styles.btnIcon} />
            {intl.$t({ id: "EMAIL_US" })}
          </button>
          {isLogin && (
            <button type="button" className={styles.btn} onClick={liveChat}>
              <Onlinesupport className={styles.btnIcon} />
              {intl.$t({ id: "LIVE_CHAT" })}
            </button>
          )}
        </div>
        <HelpCenterMenuMb items={routeMb(location)} defaultKey="1" />
      </div>
    );
  };

  return isMobile() ? renderMb() : renderPc();
};

export default Index;
