import { FormattedMessage } from "react-intl";
import dayjs from "@/common/day";
import { toFixed2 } from "@/utils";

export const balanceHistoryColumns = [
  {
    title: <FormattedMessage id="BALANCE_HISTORY_TRANSACTIION" />,
    dataIndex: "externalTransactionId",
    width: 200,
    render: (text) => {
      return text || "-";
    },
  },
  {
    title: <FormattedMessage id="TYPE" />,
    dataIndex: "type",
    width: 214,
    render: (text) => {
      return <FormattedMessage id={`BALANCE_STATUS_${text}`} />;
    },
  },
  {
    title: <FormattedMessage id="BEFORE_AMOUNT" />,
    dataIndex: "balanceBefore",
    width: 188,
    render: (text) => {
      return toFixed2(text);
    },
  },
  {
    title: <FormattedMessage id="DEPOSIT_AMOUNT" />,
    dataIndex: "amount",
    width: 150,
    render: (text) => {
      return toFixed2(text);
    },
  },
  {
    title: <FormattedMessage id="AFTER_AMOUNT" />,
    dataIndex: "balanceAfter",
    width: 181,
    render: (text) => {
      return toFixed2(text);
    },
  },
  {
    title: <FormattedMessage id="RECORD_TIME" />,
    dataIndex: "createdAt",
    width: 198,
    render: (text, record) => {
      return dayjs(record.createdAt)
        .tz("Asia/Tokyo")
        .format("YYYY-MM-DD HH:mm:ss");
    },
  },
];

export const balanceHistoryCategorys = [
  {
    label: <FormattedMessage id="ALL_CATEGORIES" />,
    value: -1,
  },
  {
    label: <FormattedMessage id="BALANCE_STATUS_0" />,
    value: 0,
  },
  {
    label: <FormattedMessage id="BALANCE_STATUS_1" />,
    value: 1,
  },
  {
    label: <FormattedMessage id="BALANCE_STATUS_4" />,
    value: 4,
  },
  {
    label: <FormattedMessage id="BALANCE_STATUS_5" />,
    value: 5,
  },
  {
    label: <FormattedMessage id="BALANCE_STATUS_7" />,
    value: 7,
  },
  {
    label: <FormattedMessage id="BALANCE_STATUS_9" />,
    value: 9,
  },
  {
    label: <FormattedMessage id="BALANCE_STATUS_10" />,
    value: 10,
  },
  {
    label: <FormattedMessage id="BALANCE_STATUS_16" />,
    value: 16,
  },
];

export const bettingHistoryColumns = [
  {
    title: <FormattedMessage id="PLATFORM" />,
    dataIndex: "gameApi",
    render: (data) => {
      return data.name.replace("SoftGamings", "") || "-";
    },
    width: 211,
  },
  {
    title: <FormattedMessage id="GAME" />,
    dataIndex: "gameName",
    width: 126,
  },
  {
    title: <FormattedMessage id="BETTING_AMOUNT" />,
    dataIndex: "bet",
    width: 218,
  },
  {
    title: <FormattedMessage id="EFFECTIVE_AMOUNT" />,
    dataIndex: "effectiveBet",
    width: 226,
  },
  {
    title: <FormattedMessage id="RESULT" />,
    dataIndex: "payout",
    width: 144,
    render: (text, record) => {
      return (Number(record.payout) - Number(record.bet)).toFixed(2);
    },
  },
  {
    title: <FormattedMessage id="BETTING_TIME" />,
    dataIndex: "betTime",
    width: 209,
    render: (text, record) => {
      return dayjs(record.betTime)
        .tz("Asia/Tokyo")
        .format("YYYY-MM-DD HH:mm:ss");
    },
  },
];

export const bettingHistoryCategorys = [
  {
    label: <FormattedMessage id="ALL_CATEGORIES" />,
    value: -1,
  },
  {
    label: <FormattedMessage id="DEPOSIT_STATUS_0" />,
    value: 0,
  },
  {
    label: <FormattedMessage id="DEPOSIT_STATUS_1" />,
    value: 1,
  },
  {
    label: <FormattedMessage id="DEPOSIT_STATUS_11" />,
    value: 10,
  },
];

export const depositHistoryColumns = [
  {
    title: <FormattedMessage id="ORDER_NUMBER" />,
    dataIndex: "id",
    width: 277,
    render: (text) => text || "-",
  },
  {
    title: <FormattedMessage id="PAYMENT" />,
    dataIndex: "paymentMethod",
    render: (data) => {
      return data.name;
    },
    width: 134,
  },
  {
    title: <FormattedMessage id="DEPOSIT_AMOUNT" />,
    dataIndex: "amount",
    width: 197,
    align: "center",
    render: (text) => {
      return toFixed2(text);
    },
  },
  {
    title: <FormattedMessage id="DEPOSIT_TIME" />,
    dataIndex: "approvalDate",
    render: (text, record) => {
      return dayjs(record.requestedDate)
        .tz("Asia/Tokyo")
        .format("YYYY-MM-DD HH:mm:ss");
    },
    width: 227,
  },
  {
    title: <FormattedMessage id="BONUS" />,
    dataIndex: "Bonus",
    width: 192,
    render: (text, record, index) => {
      return "-";
    },
  },
  {
    title: <FormattedMessage id="STATUS" />,
    dataIndex: "status",
    render: (text) => {
      return <FormattedMessage id={`DEPOSIT_STATUS_${text}`} />;
    },
    width: 156,
  },
];

export const depositHistoryCategorys = [
  {
    label: <FormattedMessage id="ALL_CATEGORIES" />,
    value: -1,
  },
  {
    label: <FormattedMessage id="DEPOSIT_STATUS_1" />,
    value: 1,
  },
  {
    label: <FormattedMessage id="DEPOSIT_STATUS_10" />,
    value: 10,
  },
  {
    label: <FormattedMessage id="DEPOSIT_STATUS_11" />,
    value: 11,
  },
  {
    label: <FormattedMessage id="DEPOSIT_STATUS_12" />,
    value: 12,
  },
];

export const rewardHistorySourceType = {
  0: <FormattedMessage id="REWARD_DEPOSITS_0" />,
  1: <FormattedMessage id="BONUS" />,
  2: <FormattedMessage id="BALANCE_STATUS_10" />,
};

export const rewardHistoryColumns = [
  {
    title: <FormattedMessage id="CATEGORY" />,
    dataIndex: "sourceType",
    render: (text) => {
      return rewardHistorySourceType[text] || "-";
    },
  },
  {
    title: <FormattedMessage id="PROMOTIONS" />,
    dataIndex: "promoName",
    render: (text) => {
      return text || "-";
    },
  },
  {
    title: <FormattedMessage id="VALUE" />,
    dataIndex: "lockedOnAmount",
    render: (text) => {
      return toFixed2(text);
    },
  },
  {
    title: <FormattedMessage id="REQUIRED_WAGERING" />,
    dataIndex: "betRequired",
    render: (text) => {
      return toFixed2(text);
    },
  },
  {
    title: <FormattedMessage id="WAGERED" />,
    dataIndex: "betAmount",
    render: (text) => {
      return toFixed2(text);
    },
  },
  {
    title: <FormattedMessage id="GRANTED_DATE" />,
    dataIndex: "createdAt",
    render: (text, record) => {
      return dayjs(text).tz("Asia/Tokyo").format("YYYY-MM-DD HH:mm:ss");
    },
  },
  {
    title: <FormattedMessage id="STATUS" />,
    dataIndex: "status",
    render: (text) => {
      return <FormattedMessage id={`REWARD_STATUS_${text}`} />;
    },
  },
];

export const withdrawalHistoryColumns = [
  {
    title: <FormattedMessage id="ORDER_NUMBER" />,
    dataIndex: "id",
    width: 160,
    render: (text) => text || "-",
  },
  {
    title: <FormattedMessage id="PAYMENT" />,
    dataIndex: "thirdPartyPaymentName",
    render: (text) => text || "-",
    width: 180,
  },
  {
    title: <FormattedMessage id="AMOUNT" />,
    dataIndex: "amount",
    width: 200,
    render: (text) => {
      return toFixed2(text);
    },
  },
  {
    title: <FormattedMessage id="TIME" />,
    dataIndex: "approvalDate",
    render: (text, record) => {
      return dayjs(record.requestedDate)
        .tz("Asia/Tokyo")
        .format("YYYY-MM-DD HH:mm:ss");
    },
    width: 180,
  },
  {
    title: <FormattedMessage id="STATUS" />,
    dataIndex: "status",
    render: (text) => {
      return <FormattedMessage id={`WITHDRAWAL_STATUS_${text}`} />;
    },
    width: 163,
  },
];

export const withdrawalHistoryCategorys = [
  {
    label: <FormattedMessage id="ALL_CATEGORIES" />,
    value: -1,
  },
  {
    label: <FormattedMessage id="WITHDRAWAL_STATUS_1" />,
    value: 1,
  },
  {
    label: <FormattedMessage id="WITHDRAWAL_STATUS_10" />,
    value: 10,
  },
  {
    label: <FormattedMessage id="WITHDRAWAL_STATUS_11" />,
    value: 11,
  },
];
