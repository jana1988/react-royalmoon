import { FormattedMessage } from "react-intl";

import {
  visa,
  shoudong,
  _default,
  transfer_1,
  transfer_2,
  transfer_3,
  crypto,
  ecopayz,
  tigerpay,
  vagewallet,
  JBC,
  coming_soon_en,
  coming_soon_jp,
} from "@/assets/deposit_withdraw";

export const bankImgs = {
  1: shoudong,
  7: visa,
  8: transfer_1,

  10011: transfer_3,
  10013: tigerpay,
  10014: tigerpay,
  10015: transfer_2,
  10016: vagewallet,

  // 77: tigerpay,
  75: tigerpay,

  60: transfer_2,
  61: transfer_1,
  62: vagewallet,

  74: transfer_3,

  _default,
};
export const isPendingBankImgs = [
  { img: ecopayz, tip: "Comging Soon" },
  // { img: vagewallet, tip: "Comging Soon" },
  // { img: tigerpay, tip: "Comging Soon" },
  { img: crypto, tip: "Comging Soon" },
  { img: JBC, tip: "Comging Soon" },
];

export const coming_soon = {
  en: coming_soon_en,
  ja: coming_soon_jp,
};

export const withdraw_help = [
  {
    question: <FormattedMessage id="WITHDRAW_HELP_QUESTION_1" />,
    answer: <FormattedMessage id="WITHDRAW_HELP_ANSWER_1" />,
  },
  {
    question: <FormattedMessage id="WITHDRAW_HELP_QUESTION_2" />,
    answer: <FormattedMessage id="WITHDRAW_HELP_ANSWER_2" />,
  },
  {
    question: <FormattedMessage id="WITHDRAW_HELP_QUESTION_3" />,
    answer: <FormattedMessage id="WITHDRAW_HELP_ANSWER_3" />,
  },
];
