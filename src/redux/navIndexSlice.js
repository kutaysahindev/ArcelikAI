import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  index: 0,
  adminIndex: "Dashboard",
  // const sidebarItems = [
  //   "Dashboard",
  //   "Video Dashboard",
  //   "Inbox",
  //   "Create Questions",
  //   "Question Pool",
  //   "Cloud Pricing",
  //   "To-Do",
  //   "Settings",
  //   "Logout",
  // ];
};

export const navIndexSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setIndex: (state, action) => {
      state.index = action.payload;
    },
    setAdminIndex: (state, action) => {
      state.adminIndex = action.payload;
    },
  },
});

export const { setIndex, setAdminIndex } = navIndexSlice.actions;

export default navIndexSlice.reducer;
