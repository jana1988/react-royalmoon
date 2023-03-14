import { createSlice } from "@reduxjs/toolkit";

export const personalSlice = createSlice({
  name: "personal",
  initialState: {
    agent: {},
  },
  reducers: {
    setAgent(state, { payload }) {
      state.agent = payload;
    },
  },
});

export const { setAgent } = personalSlice.actions;

export default personalSlice.reducer;
