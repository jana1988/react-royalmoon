import { createIntl, createIntlCache } from "react-intl";
import locales from "@/locales";
const cache = createIntlCache();

const newIntl = {
  intl: null,
  setIntl: function () {
    this.intl = createIntl(
      {
        locale: localStorage.getItem("locale") || "ja",
        messages: locales[localStorage.getItem("locale") || "ja"],
      },
      cache,
    );
  },
};

newIntl.setIntl();

export { newIntl };
