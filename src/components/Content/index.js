import style from "./index.less";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthModal from "@/components/Auth";

import Palette from "@/components/Palette";
import Tabbar from "@/components/Tabbar";
import { useLocation } from "react-router-dom";
import {
  filterHeaderComp,
  filterFooterComp,
  filterTabbarComp,
  filterContentPaddingButtomComp,
} from "./constant";

import { isMobile } from "@/utils";
import { useEffect } from "react";

const Index = (props) => {
  const { pathname = "" } = useLocation() || {};
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const renderPaddingButtom = () => <div className={style.paddingButtom}></div>;
  return (
    <>
      {filterHeaderComp(pathname, isMobile()) && <Header />}
      <div className={style.content}>
        {props.children}
        <AuthModal />
        <Palette />
        {filterContentPaddingButtomComp(pathname) && renderPaddingButtom()}
      </div>
      {isMobile() && filterTabbarComp(pathname) && <Tabbar />}

      {filterFooterComp(pathname) && <Footer />}
    </>
  );
};
export default Index;
