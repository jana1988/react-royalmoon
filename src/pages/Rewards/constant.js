import { FormattedMessage } from "react-intl";
export const freeSpinStatus = {
  1: {
    name: <FormattedMessage id="REWARDS_PLAY_NOW" />,
  },
  11: {
    name: <FormattedMessage id="REWARDS_EXPIRED" />,
    disbaled: true,
  },
  2: {
    name: <FormattedMessage id="REWARDS_CLAIMED" />,
    disbaled: true,
  },
  10: {
    name: "",
  },
};
