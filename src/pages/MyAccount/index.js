import Info from "./components/Info";
import Tabs from "./components/Tabs";
import { NavBar } from "@/components/Ui";
import { isMobile } from "@/utils";

import { useIntl } from "react-intl";
import useGuard from "@/hooks/useGuard";
export default () => {
  const intl = useIntl();
  useGuard();
  return (
    <>
      {isMobile() ? <NavBar title={intl.$t({ id: "MY_ACCOUNT" })} /> : null}
      <Info />
      <Tabs />
    </>
  );
};
