//Imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SupportedFileTypes: ["pdf"],
  LandingUrl: "https://www.google.com",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSupportedFileTypes: (state, action) => {
      state.index = action.payload;
    },
    updateSettings: (state, action) => {
      const { SupportedFileTypes, LandingUrl } = action.payload;
      state.SupportedFileTypes = SupportedFileTypes;
      state.LandingUrl = LandingUrl;
    },
  },
});

export const { setSupportedFileTypes, updateSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
