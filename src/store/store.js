import { configureStore } from "@reduxjs/toolkit";
import tempReducer from "./temp";

export const store = configureStore({
  reducer: {
    temp: tempReducer,
  },
});
