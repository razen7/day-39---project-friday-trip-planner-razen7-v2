import { configureStore } from "@reduxjs/toolkit";
import tripDReducer from "./slices/tripSlice";

export const store = configureStore({
  reducer: {
    tripS: tripDReducer,
  },
})