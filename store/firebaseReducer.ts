import { createSlice } from "@reduxjs/toolkit";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

/**
 ** ============================================================================
 ** Initialize [Firebase]
 ** ============================================================================
 */
const app = initializeApp({
  apiKey: "AIzaSyCOfwtf8AOpgE1F-W3JE9ZNg4jNXgPHpwA",
  authDomain: "habitual-663bc.firebaseapp.com",
  projectId: "habitual-663bc",
  storageBucket: "habitual-663bc.appspot.com",
  messagingSenderId: "671882346572",
  appId: "1:671882346572:web:6e1851bc4cb7554779f4e9",
  measurementId: "G-B5XMB8PZTN",
  databaseURL: "https://habitual-663bc-default-rtdb.firebaseio.com/",
});

/**
 ** ============================================================================
 ** Default state
 ** ============================================================================
 */
const defaultState = {
  app,
  auth: getAuth(app),
  db: getDatabase(app),
};

/**
 ** ============================================================================
 ** Slice [firebase]
 ** ============================================================================
 */
const firebaseSlice = createSlice({
  name: "firebase",
  initialState: defaultState,
  reducers: {},
});

/**
 ** ============================================================================
 ** Export [Reducer]
 ** ============================================================================
 */
export default firebaseSlice.reducer;
