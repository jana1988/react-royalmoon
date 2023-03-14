import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./reducer/languageSlice";
import authSlice from "./reducer/authSlice";
import personalSlice from "./reducer/personalSlice";

const store = configureStore({
  reducer: {
    language: languageSlice,
    auth: authSlice,
    personal: personalSlice,
  },
});

export default store;
