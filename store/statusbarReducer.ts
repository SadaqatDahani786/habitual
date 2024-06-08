import { createSlice } from "@reduxjs/toolkit";

//Default State
const defaultState = { value: true };

//statusbar slice
const statusbarSlice = createSlice({
  name: "statusbar",
  initialState: defaultState,
  reducers: {
    setStatusbarStatus: (state, payload) => {
      return { value: payload.payload.value };
    },
  },
});

//Export reducer and action creators from slice
export default statusbarSlice.reducer;
export const { setStatusbarStatus } = statusbarSlice.actions;
