import { createSlice } from "@reduxjs/toolkit";

//Default State
const defaultState = true;

//statusbar slice
const statusbarSlice = createSlice({
  name: "statusbar",
  initialState: defaultState,
  reducers: {
    setStatusbarStatus: (state, payload) => {
      return payload.payload;
    },
  },
});

//Export reducer and action creators from slice
export default statusbarSlice.reducer;
export const { setStatusbarStatus } = statusbarSlice.actions;
