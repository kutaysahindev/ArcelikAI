//Imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  index: 0,
};

export const navIndexSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setIndex: (state, action) => {
      state.index = action.payload;
    },
  },
});

export const { setIndex } = navIndexSlice.actions;

export default navIndexSlice.reducer;
