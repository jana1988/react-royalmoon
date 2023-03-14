import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import {
  HcOrder,
  HcPayment,
  HcReward,
  HcTutorial,
  User,
  AcCharge,
  AcDiscount,
  AcSetting,
  AcAlarm,
} from "@/components/Ui/Icon";

export const routeMb = (location) => [
  {
    label: <FormattedMessage id="ABOUT_US" />,
    key: "1",
    icon: <User />,
    collapsed: location.state && "1" == location.state.index,
    children: [
      {
        label: <FormattedMessage id="ABOUT_US_1_TITLE" />,
        key: "1-1",
        content: <FormattedMessage id="ABOUT_US_1_TEXT" />,
      },
    ],
  },
  {
    label: <FormattedMessage id="GETTING_START" />,
    key: "2",
    icon: <AcCharge />,
    collapsed: location.state && "2" == location.state.index,
    children: [
      {
        label: <FormattedMessage id="GETTING_START_1_TITLE" />,
        key: "2-1",
        content: <FormattedMessage id="GETTING_START_1_TEXT" />,
      },
      {
        label: <FormattedMessage id="GETTING_START_2_TITLE" />,
        key: "2-2",
        content: <FormattedMessage id="GETTING_START_2_TEXT" />,
      },
      {
        label: <FormattedMessage id="GETTING_START_3_TITLE" />,
        key: "2-3",
        content: <FormattedMessage id="GETTING_START_3_TEXT" />,
      },
      {
        label: <FormattedMessage id="GETTING_START_4_TITLE" />,
        key: "2-4",
        content: <FormattedMessage id="GETTING_START_4_TEXT" />,
      },
      {
        label: <FormattedMessage id="GETTING_START_5_TITLE" />,
        key: "2-5",
        content: <FormattedMessage id="GETTING_START_5_TEXT" />,
      },
      {
        label: <FormattedMessage id="GETTING_START_6_TITLE" />,
        key: "2-6",
        content: <FormattedMessage id="GETTING_START_6_TEXT" />,
      },
      {
        label: <FormattedMessage id="GETTING_START_7_TITLE" />,
        key: "2-7",
        content: <FormattedMessage id="GETTING_START_7_TEXT" />,
      },
    ],
  },
  {
    label: <FormattedMessage id="YOUR_ACCOUNT" />,
    key: "3",
    icon: <AcDiscount />,
    collapsed: location.state && "3" == location.state.index,
    children: [
      {
        label: <FormattedMessage id="YOUR_ACCOUNT_1_TITLE" />,
        key: "3-1",
        content: <FormattedMessage id="YOUR_ACCOUNT_1_TEXT" />,
      },
      {
        label: <FormattedMessage id="YOUR_ACCOUNT_2_TITLE" />,
        key: "3-2",
        content: <FormattedMessage id="YOUR_ACCOUNT_2_TEXT" />,
      },
      {
        label: <FormattedMessage id="YOUR_ACCOUNT_3_TITLE" />,
        key: "3-3",
        content: <FormattedMessage id="YOUR_ACCOUNT_3_TEXT" />,
      },
      {
        label: <FormattedMessage id="YOUR_ACCOUNT_4_TITLE" />,
        key: "3-4",
        content: <FormattedMessage id="YOUR_ACCOUNT_4_TEXT" />,
      },
      {
        label: <FormattedMessage id="YOUR_ACCOUNT_5_TITLE" />,
        key: "3-5",
        content: <FormattedMessage id="YOUR_ACCOUNT_5_TEXT" />,
      },
      {
        label: <FormattedMessage id="YOUR_ACCOUNT_6_TITLE" />,
        key: "3-6",
        content: <FormattedMessage id="YOUR_ACCOUNT_6_TEXT" />,
      },
      {
        label: <FormattedMessage id="YOUR_ACCOUNT_7_TITLE" />,
        key: "3-7",
        content: <FormattedMessage id="YOUR_ACCOUNT_7_TEXT" />,
      },
      {
        label: <FormattedMessage id="YOUR_ACCOUNT_8_TITLE" />,
        key: "3-8",
        content: <FormattedMessage id="YOUR_ACCOUNT_8_TEXT" />,
      },
      {
        label: <FormattedMessage id="YOUR_ACCOUNT_9_TITLE" />,
        key: "3-9",
        content: <FormattedMessage id="YOUR_ACCOUNT_9_TEXT" />,
      },
    ],
  },
  {
    label: <FormattedMessage id="TERMS_CONDITIONS" />,
    key: "4",
    icon: <AcSetting />,
    collapsed: location.state && "4" == location.state.index,
    children: [
      {
        label: <FormattedMessage id="TERMS_CONDITIONS_1_TITLE" />,
        key: "4-1",
        content: <FormattedMessage id="TERMS_CONDITIONS_1_TEXT" />,
      },
      {
        label: <FormattedMessage id="TERMS_CONDITIONS_2_TITLE" />,
        key: "4-2",
        content: <FormattedMessage id="TERMS_CONDITIONS_2_TEXT" />,
      },
      {
        label: <FormattedMessage id="TERMS_CONDITIONS_3_TITLE" />,
        key: "4-3",
        content: <FormattedMessage id="TERMS_CONDITIONS_3_TEXT" />,
      },
      {
        label: <FormattedMessage id="TERMS_CONDITIONS_4_TITLE" />,
        key: "4-4",
        content: <FormattedMessage id="TERMS_CONDITIONS_4_TEXT" />,
      },
      {
        label: <FormattedMessage id="TERMS_CONDITIONS_5_TITLE" />,
        key: "4-5",
        content: <FormattedMessage id="TERMS_CONDITIONS_5_TEXT" />,
      },
    ],
  },
  {
    label: <FormattedMessage id="CONTACT_US" />,
    key: "5",
    icon: <AcAlarm />,
    collapsed: location.state && "5" == location.state.index,
    children: [
      {
        label: <FormattedMessage id="CONTACT_US_1_TITLE" />,
        key: "5-1",
        content: <FormattedMessage id="CONTACT_US_1_TEXT" />,
      },
    ],
  },
];

export const routePc = [
  {
    label: (
      <Link to="/helpcenter/aboutus">
        <HcTutorial />
        <FormattedMessage id="ABOUT_US" />
      </Link>
    ),
    key: "1",
  },
  {
    label: (
      <Link to="/helpcenter/gettingstart">
        <User />
        <FormattedMessage id="GETTING_START" />
      </Link>
    ),
    key: "2",
  },
  {
    label: (
      <Link to="/helpcenter/youraccount">
        <HcOrder />
        <FormattedMessage id="YOUR_ACCOUNT" />
      </Link>
    ),
    key: "3",
  },
  {
    label: (
      <Link to="/helpcenter/termsandcontions">
        <HcPayment />
        <FormattedMessage id="TERMS_CONDITIONS" />
      </Link>
    ),
    key: "4",
  },
  {
    label: (
      <Link to="/helpcenter/contactus">
        <HcReward />
        <FormattedMessage id="CONTACT_US" />
      </Link>
    ),
    key: "5",
  },
];
