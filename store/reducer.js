import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  spin: false,
  userdata: [],
  jobstatus: [],
};

const global = createSlice({
  name: "global",
  initialState,
  reducers: {
    drawer: (state, action) => {
      state.visible = action.payload.modalVisible;
    },
    spinner: (state, action) => {
      state.spin = action.payload;
    },
    UserData: (state, action) => {
      state.userdata = action.payload;
    },
    JobStatus: (state, action) => {
      state.jobstatus = action.payload;
    },
    SignOut: (state, action) => {
      state.userdata = action.payload;
    },
  },
});
export const { drawer, spinner, UserData, JobStatus, SignOut } = global.actions;
export default global.reducer;
