import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: Boolean(localStorage.getItem("isLogin")) || false,
    access_token: null,
    refresh_token: null,
    current: "login",
    visibleAuthModal: false,
    // 币总
    currency: localStorage.getItem("currency"),
    userInfo: null,
    // 登录后跳转链接
    link: "",
    // 登录后是打开新窗口
    isTarget: true,
  },
  reducers: {
    onChange(state, { payload }) {
      const { link = "", isTarget = true } = payload;
      state.current = payload.current || state.current;
      state.visibleAuthModal = payload.visibleAuthModal;
      state.link = link;
      state.isTarget = isTarget;
    },

    setToken(state, { payload }) {
      state.isLogin = true;
      state.visibleAuthModal = false;
      state.access_token = payload.access_token;
      state.refresh_token = payload.refresh_token;
      window._access_token = payload.access_token;
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("refresh_token", payload.refresh_token);
      localStorage.setItem("access_token", payload.access_token);
      if (state.link) {
        if (state.isTarget) {
          window.open(state.link);
        } else {
          window.location.href = state.link;
        }
        state.link = "";
        state.isTarget = true;
      }
    },
    removeToken(state, { payload }) {
      state.isLogin = false;
      state.userInfo = null;
      state.access_token = null;
      state.refresh_token = null;
      window._access_token = null;
      state.link = "";
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("isLogin");
      localStorage.removeItem("agentId");
    },
    onChangeCurrency(state, { payload }) {
      state.currency = (payload && payload[0].currency) || state.currency;
      localStorage.setItem(
        "currency",
        (payload && payload[0].currency) || state.currency,
      );
    },
    setUserInfo(state, { payload }) {
      state.userInfo = payload;
    },
  },
});

export const {
  onChange,
  setToken,
  removeToken,
  onChangeCurrency,
  setUserInfo,
} = authSlice.actions;

export default authSlice.reducer;
