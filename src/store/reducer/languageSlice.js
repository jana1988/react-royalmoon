import { createSlice } from "@reduxjs/toolkit";
import { newIntl } from "@/hooks/useIntl";
import configLocal from "@/locales";
import Flag_en from "@/assets/header/Flag_en.webp";
import flag_jp from "@/assets/header/flag_jp.webp";

const localeImgEnum = {
  ja: flag_jp,
  en: Flag_en,
};

export const languageSlice = createSlice({
  name: "language",
  initialState: {
    locale: localStorage.getItem("locale") || "ja",
    messages: configLocal[localStorage.getItem("locale") || "ja"],
    imgSrc: localeImgEnum[localStorage.getItem("locale") || "ja"],
    textName: localStorage.getItem("locale")?.toUpperCase() || "JA",
  },
  reducers: {
    onChoose(state, { payload }) {
      localStorage.setItem("locale", payload.locale);
      newIntl.setIntl();
      state.locale = payload.locale;
      state.messages = configLocal[payload.locale];
      state.imgSrc = payload.imgSrc;
      state.textName = payload.textName;
    },
  },
});

export const { onChoose } = languageSlice.actions;

export default languageSlice.reducer;
