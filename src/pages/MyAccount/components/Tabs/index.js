import { isMobile } from "@/utils";
import { Tabs, TabsMb } from "@/components/Ui";
import DepositHistory from "../DepositHistory";
import WithdrawalHistory from "../WithdrawalHistory";
import BettingHistory from "../BettingHistory";
import RewardHistory from "../RewardHistory";
import BalanceHistory from "../BalanceHistory";
import { useIntl } from "react-intl";
import styles from "./index.less";
import { useLocation } from "react-router-dom";

export default () => {
  const intl = useIntl();
  const location = useLocation();
  const tabs = [
    {
      key: "deposit_history",
      label: intl.$t({ id: "DEPOSIT_HISTORY" }),
      children: <DepositHistory />,
    },
    {
      key: "withdrawal_history",
      label: intl.$t({ id: "WITHDRAWAL_HISTORY" }),
      children: <WithdrawalHistory />,
    },
    {
      key: "betting_history",
      label: intl.$t({ id: "BETTING_HISTORY" }),
      children: <BettingHistory />,
    },
    {
      key: "reward_history",
      label: intl.$t({ id: "REWARD_HISTORY" }),
      children: <RewardHistory />,
    },
    {
      key: "balance_history",
      label: intl.$t({ id: "BALANCE_HISTORY" }),
      children: <BalanceHistory />,
    },
  ];
  return (
    <>
      {isMobile() ? (
        <TabsMb
          defaultActiveKey={location?.state?.key || "deposit_history"}
          items={tabs}
          isScrollX
        />
      ) : (
        <div className={styles.warp}>
          <Tabs
            defaultActiveKey={location?.state?.key || "deposit_history"}
            items={tabs}
          />
        </div>
      )}
    </>
  );
};
