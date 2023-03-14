import { Tabs, TabsMb, NavBar } from "@/components/Ui";
import Desposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import { isMobile, openEmail } from "@/utils";

import styles from "./index.less";
import { Mail, Chat } from "@/components/Ui/Icon";
import { useIntl } from "react-intl";
import useGuard from "@/hooks/useGuard";
import { useLocation } from "react-router-dom";

const Index = () => {
  useGuard();
  const intl = useIntl();
  const location = useLocation();
  const locationState = location.state || {};
  return (
    <div className={styles.deposit_withdraw}>
      {isMobile() ? (
        <div>
          <NavBar title={intl.$t({ id: "PERSONAL_TAB_2" })} />
          <TabsMb
            defaultActiveKey={locationState.activeKey || "1"}
            items={[
              {
                label: intl.$t({ id: "DEPOSIT" }),
                key: "1",
                children: <Desposit />,
              },
              {
                label: intl.$t({ id: "WITHDRAW" }),
                key: "2",
                children: <Withdraw />,
              },
            ]}
            onChange={(key) => console.log(key)}
          />
        </div>
      ) : (
        <Tabs
          defaultActiveKey={locationState.activeKey || "1"}
          items={[
            {
              label: intl.$t({ id: "DEPOSIT" }),
              key: "1",
              children: <Desposit />,
            },
            {
              label: intl.$t({ id: "WITHDRAW" }),
              key: "2",
              children: <Withdraw />,
            },
          ]}
        />
      )}

      <div className={styles.right}>
        <div className={styles.chat}>
          <div onClick={openEmail}>
            {isMobile() && <Mail />}
            {intl.$t({ id: "EMAIL_US" })}
          </div>
          <div>
            {isMobile() && <Chat />}
            {intl.$t({ id: "LIVE_CHAT" })}
          </div>
        </div>
        {/* TO DO */}
        {/* <div className={styles.question}>Got trouble when Charging?</div>
        <div className={styles.anwer}>
          <p>
            Bank transfers are available 24 hours a day. Not available for
            holidays and Lunar New Year's Day.
          </p>
          <p>The transfer period is also different from bank to bank.</p>
          <p>The cost of bank transfer shall be borne by the customer. </p>
          <p>
            When transferring deposits by card, the relevant department will
            proceed in order.and therefore will not be reflected in time.{" "}
          </p>
          <p>
            Please contact online support, we'll solve the problem for you,
            thank you
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Index;
