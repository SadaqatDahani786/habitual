import { configureStore } from "@reduxjs/toolkit";

//Reducers
import statusbarReducer from "./statusbarReducer";
import firebaseReducer from "./firebaseReducer";

//Store
const store = configureStore({
  reducer: {
    statusbar: statusbarReducer,
    firebase: firebaseReducer,
  },
});

//Redux store
export default store;

//Redux store types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
