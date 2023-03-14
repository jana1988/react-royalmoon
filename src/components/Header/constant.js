import { Link } from "react-router-dom";
import { getGameUrl } from "@/utils";
import { FormattedMessage } from "react-intl";
import NewLink from "@/components/Link";

import {
  Livecasino,
  Promotions,
  Vip,
  Help,
  More,
  Info,
  Cookies,
  Partner,
  Responsible,
  Terms,
  Privacy,
  Treasure,
  World,
  Home,
  Slots,
  Sports,
  Favourite,
} from "../Ui/Icon";

export const menuMb = [
  {
    label: (
      <Link to="/slots">
        <Slots />
        <FormattedMessage id="HEADER_SLOTS" />
      </Link>
    ),
    key: "1",
  },
  {
    label: (
      <Link to="/live">
        <Livecasino />
        <FormattedMessage id="HEADER_LIVE_CASINO" />
      </Link>
    ),
    key: "2",
  },
  {
    label: (
      <NewLink
        to={getGameUrl({ gameCode: "sport", gameApiId: 10 })}
        isTarget={false}>
        <Sports />
        <FormattedMessage id="SPORTS" />
      </NewLink>
    ),
    key: "9",
  },
  {
    label: (
      <NewLink to="/myfavourites" isTarget={false}>
        <Favourite />
        <FormattedMessage id="MY_FAVOURITES" />
      </NewLink>
    ),
    key: "3",
  },
  {
    label: (
      <Link to={getGameUrl({ gameCode: "raffle", gameApiId: 90 })}>
        <Treasure />
        Mega Giveaway
        {/* <FormattedMessage id="SUPER_TREASURE_HUNTS" /> */}
      </Link>
    ),
    key: "4",
  },
  {
    label: (
      <Link to="/promotions">
        <Promotions />
        <FormattedMessage id="PROMOTIONS" />
      </Link>
    ),
    key: "5",
  },
  {
    label: (
      <Link to="/vip">
        <Vip />
        <FormattedMessage id="VIP" />
      </Link>
    ),
    key: "6",
  },
  {
    label: (
      <Link to="/helpcenter">
        <Help />
        <FormattedMessage id="HELP_CENTER" />
      </Link>
    ),
    key: "7",
  },
  {
    label: (
      <>
        <More />
        <FormattedMessage id="MORE" />
      </>
    ),
    key: "8",
    children: [
      // {
      //   label: (
      //     <>
      //       <Partner />
      //       <Link to="/proxyrecruitment">
      //         <FormattedMessage id="AFFILIATE" />
      //       </Link>
      //     </>
      //   ),
      //   key: "8-1",
      // },
      {
        label: (
          <>
            <Terms />
            <Link to="/helpcenter" state={{ index: `4` }}>
              <FormattedMessage id="HEAD_TERMS_AND_CONDITIONS" />
            </Link>
          </>
        ),
        key: "8-2",
      },
      {
        label: (
          <>
            <Privacy />
            <Link to="/helpcenter" state={{ index: `3` }}>
              <FormattedMessage id="PRIVACY" />
            </Link>
          </>
        ),
        key: "8-3",
      },
      {
        label: (
          <>
            <Info />
            <Link to="/helpcenter" state={{ index: `1` }}>
              <FormattedMessage id="HEADER_ABOUT_US" />
            </Link>
            ,
          </>
        ),
        key: "8-4",
      },
      {
        label: (
          <>
            <Responsible />
            <Link to="/helpcenter" state={{ index: `4` }}>
              <FormattedMessage id="RESPONSIBLE_GAMBLING" />
            </Link>
          </>
        ),
        key: "8-5",
      },
      {
        label: (
          <>
            <Cookies />
            <Link to="/helpcenter" state={{ index: `5` }}>
              <FormattedMessage id="COOKIE_POLICY" />
            </Link>
          </>
        ),
        key: "8-6",
      },
    ],
  },
];

export const menuPc = [
  [<FormattedMessage id="HOME" />, <Home />, "/home"],
  [<FormattedMessage id="HEADER_SLOTS" />, <Slots />, "/slots"],
  [<FormattedMessage id="LIVE_CASINO" />, <Livecasino />, "/live"],
  [
    <FormattedMessage id="SPORTS" />,
    <Sports />,
    getGameUrl({ gameCode: "sport", gameApiId: 10 }),
  ],
  [<FormattedMessage id="PROMOTIONS" />, <Promotions />, "/promotions"],
  [<FormattedMessage id="VIP" />, <Vip />, "/vip"],
];
