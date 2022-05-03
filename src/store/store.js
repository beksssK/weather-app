import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import generalWeatherReducer from "../services/generalWeather";

export const store = configureStore({
  reducer: {
    generalWeather: generalWeatherReducer,
  },
});

setupListeners(store.dispatch);
