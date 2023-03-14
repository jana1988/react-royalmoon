import { FormattedMessage } from "react-intl";
import { Sloton, RtpIcon } from "@/components/Ui/Icon";

export const gameTypes = [
  {
    title: <FormattedMessage id="POPULAR" />,
    id: true,
  },
  {
    title: <FormattedMessage id="SLOTS" />,
    id: 1,
  },
  {
    title: <FormattedMessage id="JACKPOT_SLOTS" />,
    id: 15,
  },
  {
    title: <FormattedMessage id="TABLEGAME" />,
    id: 18,
  },
  {
    title: <FormattedMessage id="SCRATCHCARDS" />,
    id: 17,
  },
  {
    title: <FormattedMessage id="GAME_OTHER" />,
    id: 16,
  },
];

export const nav = [
  {
    title: <FormattedMessage id="SLOTS" />,
    id: 1,
    icon: <Sloton />,
  },
  {
    title: "RTP",
    id: 2,
    icon: <RtpIcon />,
  },
];

export const rtpCategoryCodes = [
  {
    title: <FormattedMessage id="RTP_24H_UP" />,
    id: 0,
    rtp: "dailyRTP",
  },
  {
    title: <FormattedMessage id="RTP_24H_DOWN" />,
    id: 1,
    dn: true,
    rtp: "dailyRTP",
  },
  {
    title: <FormattedMessage id="RTP_PAST_7_DAYS_UP" />,
    id: 2,
    rtp: "weekRTP",
  },
  {
    title: <FormattedMessage id="RTP_PAST_7_DAYS_DOWN" />,
    id: 3,
    dn: true,
    rtp: "weekRTP",
  },
  {
    title: <FormattedMessage id="RTP_PAST_30_DAYS_UP" />,
    id: 4,
    rtp: "monthRTP",
  },
  {
    title: <FormattedMessage id="RTP_PAST_30_DAYS_DOWN" />,
    id: 5,
    dn: true,
    rtp: "monthRTP",
  },
];
